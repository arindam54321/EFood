export class Constants {
    public static foodCategoryImageLocation: string = 'assets/images/categories/'
    public static foodCategories: any[] = [
        { type: 'BIRYANI', name: 'Biryani', src1: 'BIRYANI.webp', src2: 'Biryani.webp' },
        { type: 'BURGER', name: 'Burger', src1: 'BURGER.webp', src2: 'Burger.webp' },
        { type: 'CHINESE', name: 'Chinese', src1: 'CHINESE.webp', src2: 'Chinese.webp' },
        { type: 'MOMOS', name: 'Momos', src1: 'MOMOS.webp', src2: 'Momos.webp' },
        { type: 'PIZZA', name: 'Pizza', src1: 'PIZZA.webp', src2: 'Pizza.webp' }
    ]
    public static foodPriceRange: any[] = [
        { from: 0, to: 0},
        { from: 0, to: 100 },
        { from: 0, to: 250 },
        { from: 0, to: 500 },
        { from: 0, to: 750 },
        { from: 0, to: 1000 }
    ]
    public static selectedLocationNotSelected = 'No Location Selected'
}