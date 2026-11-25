export interface BasePageConfig {
    type: 'about' | 'card' | 'text' | 'gallery';
    title: string;
    description?: string;
}

export interface TextPageConfig extends BasePageConfig {
    type: 'text';
    source: string;
    cover?: string;
    cover_alt?: string;
    reserve_cover?: boolean;
}

export interface CardItem {
    title: string;
    byline?: string;
    date?: string;
    content?: string;
    tags?: string[];
    image?: string;
    image_alt?: string;
    image_source?: string;
    award?: string;
    rank?: string;
    organization?: string;
    field?: string;
}

export interface CardSection {
    title: string;
    layout?: 'list';
    columns?: string[];
    items: CardItem[];
}

export interface CardPageConfig extends BasePageConfig {
    type: 'card';
    items: CardItem[];
    layout?: 'cards' | 'table' | 'sections';
    sections?: CardSection[];
}

export interface MomentPhoto {
    src: string;
    width: number;
    height: number;
    caption?: string;
}

export interface GalleryPageConfig extends BasePageConfig {
    type: 'gallery';
    blur_sigma: number;
    empty_message?: string;
}
