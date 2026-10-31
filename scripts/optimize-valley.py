"""Optional authoring tool: requires Pillow; ordinary npm builds use saved assets."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / 'review/animatic'
records = []
for name in ['backplate.png', 'foreground.png', 'backplate-night.png', 'foreground-night.png'] + [f'clouds/soft-{i:02}.png' for i in range(1, 7)]:
    original = source / name
    derivative = original.with_suffix('.webp')
    with Image.open(original) as image:
        rgba = image.convert('RGBA')
        rgba.save(derivative, format='WEBP', lossless=True, exact=True, method=6)
        with Image.open(derivative) as decoded:
            assert decoded.size == rgba.size and decoded.convert('RGBA').tobytes() == rgba.tobytes(), name
        smaller = derivative.stat().st_size < original.stat().st_size
        records.append(dict(source=name, file=str(derivative.relative_to(source)).replace('\\', '/') if smaller else name,
                            width=rgba.width, height=rgba.height, sourceBytes=original.stat().st_size,
                            bytes=derivative.stat().st_size if smaller else original.stat().st_size))
        if not smaller:
            derivative.unlink()
manifest = root / 'scripts/valley-assets.json'
manifest.write_text(json.dumps(records, indent=2) + '\n', encoding='utf-8')
print(json.dumps(records, indent=2))
