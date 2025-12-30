import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  //.order("created_at", { ascending: false });

  if (error) {
    throw new Error("Cabins could not be loaded");
  }

  return cabins;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin?.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );

  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin?.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert({ ...newCabin, image: imagePath });

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data: cabins, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be created");
  }

  // if has the image
  if (hasImagePath) return cabins;

  // upload the image
  const { storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin?.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", cabins.id);
    throw new Error("Image could not be uploaded");
  }

  return cabins;
}

export async function deleteCabin(id) {
  const { data: cabins, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }

  return cabins;
}
