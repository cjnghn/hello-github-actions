import requests
import json
from pathlib import Path
from typing import Union


def get_query(path: Union[str, Path]):
    with open(path) as f:
        lines = f.readlines()
    return "".join(lines)


def get_disuqiet_posts(offset=0, limit=10, sortOption="popular", type="product"):
    url = "https://api.disquiet.io/graphql"
    headers = {"content-type": "application/json"}
    payload = {
        "operationName": "GetPosts",
        "query": get_query("./query.gql"),
        "variables": {
            "offset": offset,
            "limit": limit,
            "sortOption": sortOption,
            "type": type,
        },
    }
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    data = response.json()

    return data["data"]["posts"]


def parse_posts_to_md(posts):
    md_text = ""
    for post in posts:
        typename = post.get("__typename", None)
        if typename == "Product":
            name = post.get("name", "제목이 없습니다.")
            tagline = post.get("tagline", "설명이 없습니다.")
            topics = ",".join(
                [topic["display_name"] for topic in post.get("topics", [])]
            )
            url_slug = post.get("url_slug", "")
            url = "https://disquiet.io/product/" + url_slug
        else:
            continue

        content = f"<div><a href='{url}'><h3>{name}</h3><div>{tagline}</div><div>{topics}</div></a></div>"
        md_text += content

    return md_text


if __name__ == "__main__":
    posts = get_disuqiet_posts()
    md = parse_posts_to_md(posts)

    print(md)
