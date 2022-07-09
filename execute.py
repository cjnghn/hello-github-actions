import os

from datetime import datetime
from crawl_disquiet import get_disuqiet_posts, parse_posts_to_md
from util import get_github_repo, upload_github_issue

if __name__ == "__main__":
    today = datetime.now()

    access_token = os.environ["MY_GITHUB_TOKEN"]
    repo_name = "hello-github-actions"

    issue_title = f"오늘의 인기 프로덕트 ({today.year}.{today.month}.{today.day})"
    posts = get_disuqiet_posts()
    md_text = parse_posts_to_md(posts)

    repo = get_github_repo(access_token, repo_name)
    upload_github_issue(repo, issue_title, md_text)

    print("DONE 🎉")
