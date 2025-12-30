import supabase from "./supabase";

export async function apiAuth({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  // if user in the session
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  let { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updateUser({ fullName, avatar, password }) {
  // 1. update password or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. upload the avatar image
  const avatarName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (avatarError) throw new Error(avatarError.message);

  // 3. update avatar in the user
  const avatarPath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/avatars/${avatarName}`;

  const { data: userData, error: userError } = await supabase.auth.updateUser({
    data: {
      avatar: avatarPath,
    },
  });

  if (userError) throw new Error(userError.message);

  return userData;
}
