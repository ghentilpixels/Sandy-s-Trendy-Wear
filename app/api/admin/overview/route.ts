import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  // prefer early failure at runtime when env is missing
}

export async function GET() {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { message: "Supabase not configured" },
        { status: 500 },
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("id,totalAmount,created_at");
    if (ordersError) throw ordersError;

    const totalOrders = ordersData?.length ?? 0;
    const totalRevenue =
      ordersData?.reduce(
        (s: number, o: any) => s + parseFloat(o.totalAmount || 0),
        0,
      ) ?? 0;

    const { data: customersData, error: customersError } = await supabase
      .from("users")
      .select("id,role");
    if (customersError) throw customersError;
    const totalCustomers = (customersData || []).filter(
      (u: any) => u.role === "customer",
    ).length;

    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("id");
    if (productsError) throw productsError;
    const totalProducts = productsData?.length ?? 0;

    // recent orders - fetch last 5
    const { data: recentOrders } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json({
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2),
      totalCustomers,
      totalProducts,
      recentOrders,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 },
    );
  }
}
