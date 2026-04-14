export interface Bike {
  id: number;
  company: string;
  brand: string;
  model: string;
  bike_type: string;
  license_category: string;
  main_photo: string;
  photos: string[];
  engine_capacity_cc: number;
  year: number;
  transmission: "manual" | "automatic";
  daily_rental_price: number;
  weekly_rental_price: number;
  monthly_rental_price: number;
  sale_price: number;
  status: "available" | "rented" | "sold";
  busy_until?: string;
  created_at: string;
  updated_at: string;
}
