import { supabase } from "../lib/supabase"

export const loginUser = async (
  email,
  password
) => {

  const { data, error } =
    await supabase.auth.signInWithPassword({

      email,
      password

    })

  console.log(data)
  console.log(error)

  return { data, error }
}

export const registerUser = async (
  email,
  password,
  name
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      }
    }
  });
  
  return { data, error };
}