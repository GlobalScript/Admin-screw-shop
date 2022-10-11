export interface Product {
    id: string;
    short: string;
    price: string;
    description: string;
    availability?: boolean;
    category: string;
    image0: string,
    image?: File
}