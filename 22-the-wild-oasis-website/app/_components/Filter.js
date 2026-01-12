"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Button from "./Button";

function Filter() {
  const searchParams = useSearchParams();

  const router = useRouter();

  function handleClick(value) {
    if (searchParams.get("capacity") === value) return;

    const params = new URLSearchParams(searchParams);

    params.set("capacity", value);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        activeFilter={searchParams.get("capacity")}
        handleClick={handleClick}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        activeFilter={searchParams.get("capacity")}
        handleClick={handleClick}
      >
        1 &mdash; 3 Guests
      </Button>
      <Button
        filter="medium"
        activeFilter={searchParams.get("capacity")}
        handleClick={handleClick}
      >
        4 &mdash; 7 Guests
      </Button>
      <Button
        filter="large"
        activeFilter={searchParams.get("capacity")}
        handleClick={handleClick}
      >
        8 &mdash; 12 Guests
      </Button>
    </div>
  );
}

export default Filter;
