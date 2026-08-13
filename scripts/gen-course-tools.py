import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
data = json.loads((root / "tmp-parsed.json").read_text(encoding="utf-8"))

lines: list[str] = [
    "export interface CourseTool {",
    "  name: string;",
    "  url: string;",
    "  purpose: string;",
    "}",
    "",
    "export interface CourseToolSection {",
    "  category: string;",
    "  items: CourseTool[];",
    "}",
    "",
    "/** Tool links from MSL-Links.xlsx / REL-Links.xlsx */",
    "export const COURSE_TOOLS: Record<string, CourseToolSection[]> = {",
]

for course_id, sections in data.items():
    lines.append(f"  '{course_id}': [")
    for sec in sections:
        lines.append("    {")
        lines.append(f"      category: {json.dumps(sec['category'], ensure_ascii=False)},")
        lines.append("      items: [")
        for it in sec["items"]:
            lines.append("        {")
            lines.append(f"          name: {json.dumps(it['name'], ensure_ascii=False)},")
            lines.append(f"          url: {json.dumps(it['url'], ensure_ascii=False)},")
            lines.append(f"          purpose: {json.dumps(it['purpose'], ensure_ascii=False)},")
            lines.append("        },")
        lines.append("      ],")
        lines.append("    },")
    lines.append("  ],")

lines.append("};")
lines.append("")

out = root / "src" / "data" / "courseTools.ts"
out.write_text("\n".join(lines), encoding="utf-8")
print(f"wrote {out}")
