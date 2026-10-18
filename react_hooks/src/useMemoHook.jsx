import { useMemo, useState } from "react";

function Products() { // cache a filtered list
  const [search, setSearch] = useState("");
  const products = ["Coffee", "Tea", "Juice"];

  const filteredProducts = useMemo(
    () => products.filter((product) =>
      product.toLowerCase().includes(search.toLowerCase())
    ),
    [products, search]
  );

  return (
    <>
      <input value={search} onChange={(event) => setSearch(event.target.value)} />
      {filteredProducts.map((product) => <p key={product}>{product}</p>)}
    </>
  );
}

// useMemo can avoid repeating an expensive calculation when its dependencies haven’t changed. For a tiny list like this, you usually don’t need it.