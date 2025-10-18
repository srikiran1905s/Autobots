import toyotaLogo from "@/assets/logos/toyota.png";
import hondaLogo from "@/assets/logos/honda.png";
import fordLogo from "@/assets/logos/ford.png";
import bmwLogo from "@/assets/logos/bmw.png";
import mercedesLogo from "@/assets/logos/mercedes.png";
import audiLogo from "@/assets/logos/audi.png";
import volkswagenLogo from "@/assets/logos/volkswagen.png";
import hyundaiLogo from "@/assets/logos/hyundai.png";
import kiaLogo from "@/assets/logos/kia.png";
import nissanLogo from "@/assets/logos/nissan.png";
import chevroletLogo from "@/assets/logos/chevrolet.png";
import mazdaLogo from "@/assets/logos/mazda.png";

export const manufacturers = [
  { id: "toyota", name: "Toyota", logo: toyotaLogo },
  { id: "honda", name: "Honda", logo: hondaLogo },
  { id: "ford", name: "Ford", logo: fordLogo },
  { id: "bmw", name: "BMW", logo: bmwLogo },
  { id: "mercedes", name: "Mercedes-Benz", logo: mercedesLogo },
  { id: "audi", name: "Audi", logo: audiLogo },
  { id: "volkswagen", name: "Volkswagen", logo: volkswagenLogo },
  { id: "hyundai", name: "Hyundai", logo: hyundaiLogo },
  { id: "kia", name: "Kia", logo: kiaLogo },
  { id: "nissan", name: "Nissan", logo: nissanLogo },
  { id: "chevrolet", name: "Chevrolet", logo: chevroletLogo },
  { id: "mazda", name: "Mazda", logo: mazdaLogo },
];

export const models = {
  toyota: [
    {
      id: "fortuner-2024",
      name: "Fortuner",
      year: "2024",
      bodyType: "SUV",
      trim: "Legender",
      image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
      specs: {
        engine: "2.8L Diesel",
        capacity: "2755cc",
        power: "201 BHP",
        transmission: "6-Speed Automatic",
        seating: "7 Seater",
        fuelType: "Diesel",
        features: ["4WD", "Leather Seats", "Sunroof", "LED Headlights"]
      }
    },
    {
      id: "camry-2024",
      name: "Camry",
      year: "2024",
      bodyType: "Sedan",
      trim: "Hybrid",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      specs: {
        engine: "2.5L Hybrid",
        capacity: "2487cc",
        power: "218 BHP",
        transmission: "eCVT",
        seating: "5 Seater",
        fuelType: "Hybrid",
        features: ["Cruise Control", "Wireless Charging", "Apple CarPlay"]
      }
    },
    {
      id: "corolla-2024",
      name: "Corolla",
      year: "2024",
      bodyType: "Sedan",
      trim: "Altis Grande",
      image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800&q=80",
      specs: {
        engine: "1.8L Petrol",
        capacity: "1798cc",
        power: "138 BHP",
        transmission: "CVT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["ABS", "Airbags", "Keyless Entry", "Push Start"]
      }
    },
    {
      id: "hilux-2024",
      name: "Hilux",
      year: "2024",
      bodyType: "Pickup",
      trim: "Revo Rocco",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
      specs: {
        engine: "2.8L Diesel",
        capacity: "2755cc",
        power: "201 BHP",
        transmission: "6-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Diesel",
        features: ["4WD", "Diff Lock", "Hill Assist", "Tow Package"]
      }
    },
    {
      id: "yaris-2024",
      name: "Yaris",
      year: "2024",
      bodyType: "Hatchback",
      trim: "Ativ",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      specs: {
        engine: "1.5L Petrol",
        capacity: "1496cc",
        power: "107 BHP",
        transmission: "CVT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Touchscreen", "Rear Camera", "Cruise Control"]
      }
    },
  ],
  honda: [
    {
      id: "civic-2024",
      name: "Civic",
      year: "2024",
      bodyType: "Sedan",
      trim: "RS",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
      specs: {
        engine: "1.5L Turbo",
        capacity: "1498cc",
        power: "180 BHP",
        transmission: "CVT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Honda Sensing", "Sunroof", "LED Lights"]
      }
    },
    {
      id: "accord-2024",
      name: "Accord",
      year: "2024",
      bodyType: "Sedan",
      trim: "Sport Hybrid",
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80",
      specs: {
        engine: "2.0L Hybrid",
        capacity: "1993cc",
        power: "212 BHP",
        transmission: "eCVT",
        seating: "5 Seater",
        fuelType: "Hybrid",
        features: ["Adaptive Cruise", "Lane Keep Assist", "Wireless CarPlay"]
      }
    },
    {
      id: "city-2024",
      name: "City",
      year: "2024",
      bodyType: "Sedan",
      trim: "Aspire",
      image: "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=800&q=80",
      specs: {
        engine: "1.5L Petrol",
        capacity: "1498cc",
        power: "121 BHP",
        transmission: "CVT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Touchscreen", "Rear AC Vents", "Keyless Entry"]
      }
    },
    {
      id: "crv-2024",
      name: "CR-V",
      year: "2024",
      bodyType: "SUV",
      trim: "Touring",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "1.5L Turbo",
        capacity: "1498cc",
        power: "193 BHP",
        transmission: "CVT",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["AWD", "Panoramic Sunroof", "Power Tailgate"]
      }
    },
    {
      id: "hrv-2024",
      name: "HR-V",
      year: "2024",
      bodyType: "SUV",
      trim: "RS",
      image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&q=80",
      specs: {
        engine: "1.5L Petrol",
        capacity: "1498cc",
        power: "121 BHP",
        transmission: "CVT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Lane Watch", "Auto AC", "Push Button Start"]
      }
    },
  ],
  ford: [
    {
      id: "mustang-2024",
      name: "Mustang",
      year: "2024",
      bodyType: "Coupe",
      trim: "GT",
      image: "https://images.unsplash.com/photo-1584345604476-8ec5f5e9a2c0?w=800&q=80",
      specs: {
        engine: "5.0L V8",
        capacity: "4951cc",
        power: "450 BHP",
        transmission: "10-Speed Automatic",
        seating: "4 Seater",
        fuelType: "Petrol",
        features: ["Performance Pack", "Digital Dash", "Active Exhaust"]
      }
    },
    {
      id: "ranger-2024",
      name: "Ranger",
      year: "2024",
      bodyType: "Pickup",
      trim: "Raptor",
      image: "https://images.unsplash.com/photo-1569521520080-886f5a7e4e12?w=800&q=80",
      specs: {
        engine: "3.0L V6 Diesel",
        capacity: "2987cc",
        power: "250 BHP",
        transmission: "10-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Diesel",
        features: ["4WD", "Off-Road Package", "Terrain Management"]
      }
    },
    {
      id: "explorer-2024",
      name: "Explorer",
      year: "2024",
      bodyType: "SUV",
      trim: "ST",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
      specs: {
        engine: "3.0L V6 Turbo",
        capacity: "2967cc",
        power: "400 BHP",
        transmission: "10-Speed Automatic",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["AWD", "Sport Mode", "Adaptive Suspension"]
      }
    },
    {
      id: "bronco-2024",
      name: "Bronco",
      year: "2024",
      bodyType: "SUV",
      trim: "Wildtrak",
      image: "https://images.unsplash.com/photo-1629460856147-7d49f35c1a2e?w=800&q=80",
      specs: {
        engine: "2.7L V6 Turbo",
        capacity: "2694cc",
        power: "330 BHP",
        transmission: "10-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["4WD", "Removable Roof", "Locking Differentials"]
      }
    },
    {
      id: "ecosport-2024",
      name: "EcoSport",
      year: "2024",
      bodyType: "SUV",
      trim: "Titanium",
      image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&q=80",
      specs: {
        engine: "1.5L Petrol",
        capacity: "1497cc",
        power: "123 BHP",
        transmission: "6-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["SYNC 3", "Rear Parking Sensors", "Automatic Climate"]
      }
    },
  ],
  bmw: [
    {
      id: "3series-2024",
      name: "3 Series",
      year: "2024",
      bodyType: "Sedan",
      trim: "330i M Sport",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1998cc",
        power: "255 BHP",
        transmission: "8-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["M Sport Package", "HUD", "Gesture Control"]
      }
    },
    {
      id: "5series-2024",
      name: "5 Series",
      year: "2024",
      bodyType: "Sedan",
      trim: "530i",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1998cc",
        power: "248 BHP",
        transmission: "8-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Executive Package", "Massage Seats", "Laser Lights"]
      }
    },
    {
      id: "x3-2024",
      name: "X3",
      year: "2024",
      bodyType: "SUV",
      trim: "xDrive30i",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1998cc",
        power: "248 BHP",
        transmission: "8-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["xDrive AWD", "Panoramic Roof", "Adaptive LED"]
      }
    },
    {
      id: "x5-2024",
      name: "X5",
      year: "2024",
      bodyType: "SUV",
      trim: "xDrive40i",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "3.0L Turbo",
        capacity: "2998cc",
        power: "335 BHP",
        transmission: "8-Speed Automatic",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["Air Suspension", "360 Camera", "Harman Kardon"]
      }
    },
    {
      id: "m4-2024",
      name: "M4",
      year: "2024",
      bodyType: "Coupe",
      trim: "Competition",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
      specs: {
        engine: "3.0L Twin-Turbo",
        capacity: "2993cc",
        power: "503 BHP",
        transmission: "8-Speed M DCT",
        seating: "4 Seater",
        fuelType: "Petrol",
        features: ["M Sport Exhaust", "Carbon Roof", "M Track Mode"]
      }
    },
  ],
  mercedes: [
    {
      id: "cclass-2024",
      name: "C-Class",
      year: "2024",
      bodyType: "Sedan",
      trim: "C300",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1991cc",
        power: "255 BHP",
        transmission: "9-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["MBUX", "Digital Cockpit", "AMG Line"]
      }
    },
    {
      id: "eclass-2024",
      name: "E-Class",
      year: "2024",
      bodyType: "Sedan",
      trim: "E300",
      image: "https://images.unsplash.com/photo-1606611013016-969c19ba8e3a?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1991cc",
        power: "255 BHP",
        transmission: "9-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Air Body Control", "Burmester Sound", "Multibeam LED"]
      }
    },
    {
      id: "glc-2024",
      name: "GLC",
      year: "2024",
      bodyType: "SUV",
      trim: "GLC300",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1991cc",
        power: "255 BHP",
        transmission: "9-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["4MATIC AWD", "Panoramic Roof", "MBUX AR"]
      }
    },
    {
      id: "gle-2024",
      name: "GLE",
      year: "2024",
      bodyType: "SUV",
      trim: "GLE450",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "3.0L Turbo",
        capacity: "2999cc",
        power: "362 BHP",
        transmission: "9-Speed Automatic",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["E-Active Body Control", "Rear-Axle Steering", "MBUX"]
      }
    },
    {
      id: "amggt-2024",
      name: "AMG GT",
      year: "2024",
      bodyType: "Coupe",
      trim: "63 S",
      image: "https://images.unsplash.com/photo-1611821064430-a8d9c0f5a2c2?w=800&q=80",
      specs: {
        engine: "4.0L V8 Biturbo",
        capacity: "3982cc",
        power: "630 BHP",
        transmission: "7-Speed DCT",
        seating: "4 Seater",
        fuelType: "Petrol",
        features: ["AMG Performance Exhaust", "Active Aero", "Track Pace"]
      }
    },
  ],
  audi: [
    {
      id: "a4-2024",
      name: "A4",
      year: "2024",
      bodyType: "Sedan",
      trim: "Premium Plus",
      image: "https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1984cc",
        power: "201 BHP",
        transmission: "7-Speed DSG",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Virtual Cockpit", "MMI Touch", "LED Matrix"]
      }
    },
    {
      id: "a6-2024",
      name: "A6",
      year: "2024",
      bodyType: "Sedan",
      trim: "Technology",
      image: "https://images.unsplash.com/photo-1606611013016-969c19ba8e3a?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1984cc",
        power: "245 BHP",
        transmission: "7-Speed DSG",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Mild Hybrid", "Matrix LED", "Bang & Olufsen"]
      }
    },
    {
      id: "q5-2024",
      name: "Q5",
      year: "2024",
      bodyType: "SUV",
      trim: "Premium Plus",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1984cc",
        power: "248 BHP",
        transmission: "7-Speed DSG",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Quattro AWD", "Virtual Cockpit Plus", "Panoramic Roof"]
      }
    },
    {
      id: "q7-2024",
      name: "Q7",
      year: "2024",
      bodyType: "SUV",
      trim: "Prestige",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "3.0L V6 Turbo",
        capacity: "2995cc",
        power: "335 BHP",
        transmission: "8-Speed Automatic",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["Adaptive Air Suspension", "Night Vision", "HD Matrix LED"]
      }
    },
    {
      id: "rs5-2024",
      name: "RS5",
      year: "2024",
      bodyType: "Coupe",
      trim: "Sportback",
      image: "https://images.unsplash.com/photo-1611821064430-a8d9c0f5a2c2?w=800&q=80",
      specs: {
        engine: "2.9L V6 Twin-Turbo",
        capacity: "2894cc",
        power: "444 BHP",
        transmission: "8-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Sport Differential", "RS Sport Exhaust", "Carbon Ceramic Brakes"]
      }
    },
  ],
  volkswagen: [
    {
      id: "golf-2024",
      name: "Golf",
      year: "2024",
      bodyType: "Hatchback",
      trim: "GTI",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1984cc",
        power: "242 BHP",
        transmission: "7-Speed DSG",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Adaptive Chassis", "Digital Cockpit Pro", "Soundaktor"]
      }
    },
    {
      id: "passat-2024",
      name: "Passat",
      year: "2024",
      bodyType: "Sedan",
      trim: "R-Line",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1984cc",
        power: "187 BHP",
        transmission: "7-Speed DSG",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Adaptive Cruise", "Lane Assist", "Digital Instruments"]
      }
    },
    {
      id: "tiguan-2024",
      name: "Tiguan",
      year: "2024",
      bodyType: "SUV",
      trim: "SEL",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1984cc",
        power: "187 BHP",
        transmission: "8-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["4MOTION AWD", "Digital Cockpit", "Area View"]
      }
    },
    {
      id: "touareg-2024",
      name: "Touareg",
      year: "2024",
      bodyType: "SUV",
      trim: "R-Line",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "3.0L V6 Turbo",
        capacity: "2967cc",
        power: "335 BHP",
        transmission: "8-Speed Automatic",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["Air Suspension", "Innovision Cockpit", "Night Vision"]
      }
    },
    {
      id: "arteon-2024",
      name: "Arteon",
      year: "2024",
      bodyType: "Sedan",
      trim: "R-Line",
      image: "https://images.unsplash.com/photo-1606611013016-969c19ba8e3a?w=800&q=80",
      specs: {
        engine: "2.0L Turbo",
        capacity: "1984cc",
        power: "268 BHP",
        transmission: "7-Speed DSG",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Dynamic Chassis Control", "Harman Kardon", "LED Matrix"]
      }
    },
  ],
  hyundai: [
    {
      id: "tucson-2024",
      name: "Tucson",
      year: "2024",
      bodyType: "SUV",
      trim: "Ultimate",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "1.6L Turbo",
        capacity: "1598cc",
        power: "177 BHP",
        transmission: "8-Speed DCT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["SmartSense", "Digital Key", "Blind-Spot View"]
      }
    },
    {
      id: "santafe-2024",
      name: "Santa Fe",
      year: "2024",
      bodyType: "SUV",
      trim: "Calligraphy",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2497cc",
        power: "277 BHP",
        transmission: "8-Speed DCT",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["HTRAC AWD", "Highway Drive Assist", "Bose Premium Audio"]
      }
    },
    {
      id: "elantra-2024",
      name: "Elantra",
      year: "2024",
      bodyType: "Sedan",
      trim: "N Line",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      specs: {
        engine: "1.6L Turbo",
        capacity: "1598cc",
        power: "201 BHP",
        transmission: "7-Speed DCT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["N Performance", "Paddle Shifters", "Sport+ Mode"]
      }
    },
    {
      id: "sonata-2024",
      name: "Sonata",
      year: "2024",
      bodyType: "Sedan",
      trim: "Limited",
      image: "https://images.unsplash.com/photo-1606611013016-969c19ba8e3a?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2497cc",
        power: "290 BHP",
        transmission: "8-Speed DCT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Digital Key", "Highway Driving Assist II", "Bose Audio"]
      }
    },
    {
      id: "kona-2024",
      name: "Kona",
      year: "2024",
      bodyType: "SUV",
      trim: "N Line",
      image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&q=80",
      specs: {
        engine: "1.6L Turbo",
        capacity: "1598cc",
        power: "195 BHP",
        transmission: "7-Speed DCT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["N Performance", "Heads-Up Display", "Wireless CarPlay"]
      }
    },
  ],
  kia: [
    {
      id: "sportage-2024",
      name: "Sportage",
      year: "2024",
      bodyType: "SUV",
      trim: "GT-Line",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "1.6L Turbo Hybrid",
        capacity: "1598cc",
        power: "227 BHP",
        transmission: "6-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Hybrid",
        features: ["Drive Mode Select", "Curved Display", "Highway Driving Assist"]
      }
    },
    {
      id: "sorento-2024",
      name: "Sorento",
      year: "2024",
      bodyType: "SUV",
      trim: "SX Prestige",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2497cc",
        power: "281 BHP",
        transmission: "8-Speed DCT",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["AWD", "Dual Sunroof", "Bose Premium Sound"]
      }
    },
    {
      id: "k5-2024",
      name: "K5",
      year: "2024",
      bodyType: "Sedan",
      trim: "GT-Line",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      specs: {
        engine: "1.6L Turbo",
        capacity: "1598cc",
        power: "180 BHP",
        transmission: "8-Speed DCT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Dual Screen Setup", "Wireless CarPlay", "Smart Cruise"]
      }
    },
    {
      id: "stinger-2024",
      name: "Stinger",
      year: "2024",
      bodyType: "Sedan",
      trim: "GT",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      specs: {
        engine: "3.3L V6 Twin-Turbo",
        capacity: "3342cc",
        power: "365 BHP",
        transmission: "8-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Launch Control", "Brembo Brakes", "Electronic LSD"]
      }
    },
    {
      id: "seltos-2024",
      name: "Seltos",
      year: "2024",
      bodyType: "SUV",
      trim: "X-Line",
      image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&q=80",
      specs: {
        engine: "1.5L Turbo",
        capacity: "1497cc",
        power: "160 BHP",
        transmission: "7-Speed DCT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Drive & Terrain Modes", "10.25 Touchscreen", "Connected Car"]
      }
    },
  ],
  nissan: [
    {
      id: "xtrail-2024",
      name: "X-Trail",
      year: "2024",
      bodyType: "SUV",
      trim: "Tekna",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "1.5L e-POWER",
        capacity: "1497cc",
        power: "204 BHP",
        transmission: "CVT",
        seating: "7 Seater",
        fuelType: "Hybrid",
        features: ["e-4ORCE AWD", "ProPILOT", "Dual Panoramic Roof"]
      }
    },
    {
      id: "patrol-2024",
      name: "Patrol",
      year: "2024",
      bodyType: "SUV",
      trim: "Platinum",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "5.6L V8",
        capacity: "5552cc",
        power: "400 BHP",
        transmission: "7-Speed Automatic",
        seating: "8 Seater",
        fuelType: "Petrol",
        features: ["4WD", "Hydraulic Body Motion Control", "Around View Monitor"]
      }
    },
    {
      id: "altima-2024",
      name: "Altima",
      year: "2024",
      bodyType: "Sedan",
      trim: "Platinum",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2488cc",
        power: "248 BHP",
        transmission: "CVT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["ProPILOT Assist", "Zero Gravity Seats", "Bose Audio"]
      }
    },
    {
      id: "gtr-2024",
      name: "GT-R",
      year: "2024",
      bodyType: "Coupe",
      trim: "NISMO",
      image: "https://images.unsplash.com/photo-1611821064430-a8d9c0f5a2c2?w=800&q=80",
      specs: {
        engine: "3.8L V6 Twin-Turbo",
        capacity: "3799cc",
        power: "600 BHP",
        transmission: "6-Speed DCT",
        seating: "4 Seater",
        fuelType: "Petrol",
        features: ["ATTESA E-TS AWD", "Carbon Ceramic Brakes", "Recaro Seats"]
      }
    },
    {
      id: "kicks-2024",
      name: "Kicks",
      year: "2024",
      bodyType: "SUV",
      trim: "Exclusive",
      image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&q=80",
      specs: {
        engine: "1.6L Petrol",
        capacity: "1598cc",
        power: "118 BHP",
        transmission: "CVT",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["Around View Monitor", "Floating Roof", "LED Headlights"]
      }
    },
  ],
  chevrolet: [
    {
      id: "camaro-2024",
      name: "Camaro",
      year: "2024",
      bodyType: "Coupe",
      trim: "SS",
      image: "https://images.unsplash.com/photo-1611821064430-a8d9c0f5a2c2?w=800&q=80",
      specs: {
        engine: "6.2L V8",
        capacity: "6162cc",
        power: "455 BHP",
        transmission: "10-Speed Automatic",
        seating: "4 Seater",
        fuelType: "Petrol",
        features: ["Magnetic Ride Control", "Performance Exhaust", "Launch Control"]
      }
    },
    {
      id: "corvette-2024",
      name: "Corvette",
      year: "2024",
      bodyType: "Coupe",
      trim: "Stingray",
      image: "https://images.unsplash.com/photo-1611821064430-a8d9c0f5a2c2?w=800&q=80",
      specs: {
        engine: "6.2L V8",
        capacity: "6162cc",
        power: "490 BHP",
        transmission: "8-Speed DCT",
        seating: "2 Seater",
        fuelType: "Petrol",
        features: ["Mid-Engine", "Performance Data Recorder", "Magnetic Ride"]
      }
    },
    {
      id: "tahoe-2024",
      name: "Tahoe",
      year: "2024",
      bodyType: "SUV",
      trim: "High Country",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "6.2L V8",
        capacity: "6162cc",
        power: "420 BHP",
        transmission: "10-Speed Automatic",
        seating: "8 Seater",
        fuelType: "Petrol",
        features: ["4WD", "Adaptive Air Ride", "Super Cruise"]
      }
    },
    {
      id: "silverado-2024",
      name: "Silverado",
      year: "2024",
      bodyType: "Pickup",
      trim: "LTZ",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
      specs: {
        engine: "6.2L V8",
        capacity: "6162cc",
        power: "420 BHP",
        transmission: "10-Speed Automatic",
        seating: "6 Seater",
        fuelType: "Petrol",
        features: ["4WD", "MultiPro Tailgate", "Trailering Package"]
      }
    },
    {
      id: "blazer-2024",
      name: "Blazer",
      year: "2024",
      bodyType: "SUV",
      trim: "RS",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "3.6L V6",
        capacity: "3564cc",
        power: "308 BHP",
        transmission: "9-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["AWD", "Twin-Clutch AWD", "Sporty Design"]
      }
    },
  ],
  mazda: [
    {
      id: "mazda3-2024",
      name: "Mazda3",
      year: "2024",
      bodyType: "Sedan",
      trim: "Premium Plus",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2488cc",
        power: "250 BHP",
        transmission: "6-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["i-Activsense", "Bose Audio", "Adaptive LED"]
      }
    },
    {
      id: "cx5-2024",
      name: "CX-5",
      year: "2024",
      bodyType: "SUV",
      trim: "Signature",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2488cc",
        power: "250 BHP",
        transmission: "6-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["i-Activ AWD", "Nappa Leather", "360 View Monitor"]
      }
    },
    {
      id: "cx9-2024",
      name: "CX-9",
      year: "2024",
      bodyType: "SUV",
      trim: "Signature",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2488cc",
        power: "250 BHP",
        transmission: "6-Speed Automatic",
        seating: "7 Seater",
        fuelType: "Petrol",
        features: ["i-Activ AWD", "Rosewood Trim", "Head-Up Display"]
      }
    },
    {
      id: "mx5-2024",
      name: "MX-5 Miata",
      year: "2024",
      bodyType: "Convertible",
      trim: "Grand Touring",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
      specs: {
        engine: "2.0L Skyactiv",
        capacity: "1998cc",
        power: "181 BHP",
        transmission: "6-Speed Manual",
        seating: "2 Seater",
        fuelType: "Petrol",
        features: ["RWD", "Recaro Seats", "Bose Audio"]
      }
    },
    {
      id: "cx30-2024",
      name: "CX-30",
      year: "2024",
      bodyType: "SUV",
      trim: "Premium Plus",
      image: "https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d?w=800&q=80",
      specs: {
        engine: "2.5L Turbo",
        capacity: "2488cc",
        power: "250 BHP",
        transmission: "6-Speed Automatic",
        seating: "5 Seater",
        fuelType: "Petrol",
        features: ["i-Activ AWD", "Premium Interior", "Adaptive Cruise"]
      }
    },
  ],
};
