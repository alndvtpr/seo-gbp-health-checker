import os
import re

payload_path = r'C:\Users\Alain Dave G. Tapiru\Desktop\stitch_alain_dave_tapiru_portfolio\payload-website\src\app\(frontend)\page.tsx'
portfolio_path = r'C:\Users\Alain Dave G. Tapiru\Desktop\stitch_alain_dave_tapiru_portfolio\portfolio_cms\src\app\(frontend)\page.tsx'

with open(payload_path, 'r', encoding='utf-8') as f:
    payload_content = f.read()

with open(portfolio_path, 'r', encoding='utf-8') as f:
    portfolio_content = f.read()

# Find end of section 1 in payload
match = re.search(r'</section>\s*\{\/\* 2\. TOOLS I USE GRID \*\/\}', payload_content)
top_half = payload_content[:match.start() + len('</section>\n\n')]

match2 = re.search(r'\{\/\*.*2\. Tools I Use Grid.*\*\/\}', portfolio_content)
bottom_half = portfolio_content[match2.start():]

constants_split = portfolio_content.split('const TOOLS_STACK')
constants_part = 'const TOOLS_STACK' + constants_split[1].split('export default function')[0]

final_content = top_half.replace('export const dynamic =', constants_part + '\nexport const dynamic =') + bottom_half

with open(payload_path, 'w', encoding='utf-8') as f:
    f.write(final_content)

print('Done rewriting page.tsx')
