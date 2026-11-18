import json
import os
import urllib.request

with open("pokenots_151_named.json", "r", encoding="utf-8") as f:
    cards = json.load(f)

os.makedirs("pokenots_151", exist_ok=True)

for name, url in cards.items():
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp, open(os.path.join("pokenots_151", f"{name}.webp"), "wb") as out:
        out.write(resp.read())

print(f"Downloaded {len(cards)} files into ./pokenots_151/")