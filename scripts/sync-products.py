# data/products.json -> js/products-data.js
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
data = json.loads((root / "data" / "products.json").read_text(encoding="utf-8"))
(root / "js" / "products-data.js").write_text(
    "/* Ürün kataloğu — otomatik üretildi. Kaynak: data/products.json */\n"
    "window.BIOCARE_DATA = "
    + json.dumps(data, ensure_ascii=False, indent=2)
    + ";\n",
    encoding="utf-8",
)
print("OK: js/products-data.js güncellendi")
