#!/usr/bin/env python3
"""Build the static site: parse videos/**/*.md into notes.json and copy site/ into _site/."""
import json, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site"
META_RE = re.compile(r"^-\s*(連結|頻道|標籤)：(.*)$")


def parse_note(path: Path, lang: str) -> dict:
    lines = path.read_text(encoding="utf-8").splitlines()
    title, meta, body_start = path.stem, {}, 0
    for i, line in enumerate(lines):
        if line.startswith("# ") and title == path.stem:
            title = line[2:].strip()
            body_start = i + 1
            continue
        m = META_RE.match(line.strip())
        if m:
            meta[m.group(1)] = m.group(2).strip()
            body_start = i + 1
        elif line.startswith("## "):
            break
    note = {
        "id": f"{lang}-{path.stem}",
        "lang": lang,
        "title": title,
        "url": meta.get("連結", ""),
        "channel": "", "duration": "",
        "tags": re.findall(r"#([^\s#]+)", meta.get("標籤", "")),
        "summary": "",
        "source": f"videos/{lang}/{path.name}",
    }
    for part in ("頻道：" + meta.get("頻道", "")).split("｜"):
        k, _, v = part.partition("：")
        if k.strip() == "頻道": note["channel"] = v.strip()
        elif k.strip() == "長度": note["duration"] = v.strip()
    vid = re.search(r"(?:v=|youtu\.be/)([\w-]{11})", note["url"])
    note["videoId"] = vid.group(1) if vid else ""

    body = "\n".join(lines[body_start:]).strip()
    m = re.search(r"^## 一句話\s*\n(.*?)(?=^## |\Z)", body, re.S | re.M)
    if m:
        note["summary"] = m.group(1).strip()
        body = (body[: m.start()] + body[m.end():]).strip()
    note["body"] = body
    return note


def readme_section(heading: str) -> str:
    text = (ROOT / "README.md").read_text(encoding="utf-8")
    m = re.search(rf"^## [^\n]*{re.escape(heading)}[^\n]*\n(.*?)(?=^## |\Z)", text, re.S | re.M)
    return m.group(1).strip() if m else ""


def main() -> int:
    notes = []
    for lang in ("en", "zh"):
        for p in sorted((ROOT / "videos" / lang).glob("*.md")):
            notes.append(parse_note(p, lang))
    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(ROOT / "site", OUT)
    data = {"notes": notes, "themes": readme_section("共同主題"), "backlog": readme_section("待整理")}
    (OUT / "notes.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    (OUT / ".nojekyll").write_text("")
    print(f"Built {len(notes)} notes -> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
