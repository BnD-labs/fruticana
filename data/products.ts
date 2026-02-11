export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    color: {
        primary: string;
        secondary: string;
        accent: string;
    };
    folderPath: string;
    frameCount: number;
    sections: {
        section1: string;
        section2: string;
        section3: string;
        section4: string;
    };
    details: {
        ingredients: string[];
        benefits: string[];
        nutritionHighlight: string;
    };
    price: string;
}

export const products: Product[] = [
    {
        id: "mango",
        name: "Mango Juice",
        tagline: "Golden Nectar of Excellence",
        description: "Indulge in the king of fruits. Our premium mango juice delivers unmatched sweetness and a velvety texture that dances on your palate. Pure sunshine in a bottle.",
        color: {
            primary: "#ffa502",
            secondary: "#ff6348",
            accent: "#ff7979",
        },
        folderPath: "/images/mango",
        frameCount: 200,
        sections: {
            section1: "The King of Fruits",
            section2: "Handpicked Excellence",
            section3: "Smooth & Velvety",
            section4: "Taste the Sunshine",
        },
        details: {
            ingredients: ["100% Alphonso Mango", "No Preservatives", "Flash Pasteurized"],
            benefits: [
                "High in Vitamin A",
                "Supports Eye Health",
                "Natural Energy Boost",
                "Promotes Healthy Skin",
            ],
            nutritionHighlight: "180% Daily Vitamin A",
        },
        price: "K12",
    },
    {
        id: "guava",
        name: "Guava Juice",
        tagline: "Tropical Paradise in Every Sip",
        description: "Experience the exotic sweetness of premium guava, packed with Vitamin C and antioxidants. Our cold-pressed process preserves the natural essence of this tropical treasure.",
        color: {
            primary: "#ff6b9d",
            secondary: "#feca57",
            accent: "#ff6b35",
        },
        folderPath: "/images/guava",
        frameCount: 200,
        sections: {
            section1: "Harvested from Paradise",
            section2: "Cold-Pressed Perfection",
            section3: "Bursting with Flavor",
            section4: "Pure Tropical Energy",
        },
        details: {
            ingredients: ["100% Pure Guava", "No Added Sugar", "Natural Vitamins"],
            benefits: [
                "Rich in Vitamin C",
                "Boosts Immunity",
                "Natural Antioxidants",
                "Supports Digestive Health",
            ],
            nutritionHighlight: "220% Daily Vitamin C",
        },
        price: "K12",
    },
    {
        id: "berry",
        name: "Mixed Berry",
        tagline: "A Symphony of Berries",
        description: "An exquisite blend of strawberries, blueberries, raspberries, and blackberries. Each bottle contains the essence of over 100 hand-selected berries, creating a flavor explosion unlike any other.",
        color: {
            primary: "#a29bfe",
            secondary: "#fd79a8",
            accent: "#6c5ce7",
        },
        folderPath: "/images/mixedberry",
        frameCount: 200,
        sections: {
            section1: "Berry Beautiful",
            section2: "Four Berry Harmony",
            section3: "Antioxidant Powerhouse",
            section4: "Nature's Candy",
        },
        details: {
            ingredients: [
                "Strawberries",
                "Blueberries",
                "Raspberries",
                "Blackberries",
                "100% Natural",
            ],
            benefits: [
                "Extremely High in Antioxidants",
                "Supports Brain Health",
                "Anti-Inflammatory Properties",
                "Heart Health Support",
            ],
            nutritionHighlight: "400% Daily Antioxidants",
        },
        price: "K12",
    },
];
