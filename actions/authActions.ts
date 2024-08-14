'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { FieldValues } from 'react-hook-form'
import { signUpFormSchema } from '@/components/forms/SignUpForm'
import { createProfile } from './profileAction'
import { signInFormSchema } from '@/components/forms/SignInForm'

export async function login(data: FieldValues) {
  const supabase = createClient()

  // const parsedData = signInFormSchema.parse(data)

  const {email, password} = data;

  const signInData = {
    email,
    password
  }
  const { error } = await supabase.auth.signInWithPassword(signInData)

  if (error) {
    redirect(`/signin?message=${error.message}`)
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(data: FieldValues) {
  const supabase = createClient()

  console.log(data)
  // const parsedData = signUpFormSchema.parse(data)

  const {email, password, firstname, lastname} = data;

  const signUpData = {
    email: data.email,
    password: data.password
  }

//   create user
  const { error, data: user } = await supabase.auth.signUp(signUpData)

  if (error) {
    redirect(`/signup?message=${error.message}`)
  }

  const userId = user.user?.id

  // create user profile
  if(userId)
    await createProfile({firstname, lastname, userId })

  revalidatePath('/', 'layout')
  redirect('/signin')
}

export async function signout(){
  const supabase = createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')
}