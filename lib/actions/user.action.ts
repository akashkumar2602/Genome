"use server";

import { auth, signIn, signOut } from "@/auth";
import {
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  paymentMethodSchema,
} from "../validator";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { ShippingAddress } from "@/types";
import { getMyCart } from "./cart.action";
import { z } from "zod";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    // Set user from form and validate it with Zod schema
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}

// Sign the user out
export async function signOutUser() {
  // get current users cart and delete it so it does not persist to next user
  const currentCart = await getMyCart();
  await prisma.cart.delete({ where: { id: currentCart?.id } });
  await signOut();
}

// Register/SignUp a new user
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      confirmPassword: formData.get("confirmPassword"),
      password: formData.get("password"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

// Update user's address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not found");

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update user's payment method
export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found");

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Fetch user details for digitalData
export async function getUserDataDigitalData() {
  const session = await auth();

  if (!session?.user) {
    return null; // User is not logged in
  }
  if (!session.user.email) {
    throw new Error("User email is required");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      loyalityId: true,
      loyalityType: true,
      phoneNumber: true,
      gender: true,
      age: true,
      dob: true,
      city: true,
      state: true,
      country: true,
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    loggedIn: true,
    role: user.role,
    loyalityId: user.loyalityId,
    loyalityType: user.loyalityType,
    phoneNumber: user.phoneNumber,
    gender: user.gender,
    age: user.age,
    dob: user.dob,
    city: user.city,
    state: user.state,
    country: user.country,
    accountType: "standard", // Example field (you can modify based on your data)
    subscriptionStatus: "active", // Example field
  };
}

// Update User Profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
      },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
