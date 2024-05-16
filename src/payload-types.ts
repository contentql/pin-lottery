/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    media: Media;
    contest: Contest;
    cart: Cart;
    tickets: Ticket;
    winner: Winner;
    contact: Contact;
    blog: Blog;
    tags: Tag;
    wishlist: Wishlist;
    transaction: Transaction;
    trash: Trash;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
    about: About;
    team: Team;
    testimonial: Testimonial;
    features: Feature;
    supportInfo: SupportInfo;
    faq: Faq;
    howToPlayInfo: HowToPlayInfo;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  user_name?: string | null;
  dob?: string | null;
  address?: string | null;
  phone_number?: string | null;
  image?: string | Media | null;
  roles?: ('admin' | 'manager' | 'editor' | 'user')[] | null;
  amount: number;
  paystack_customer_code?: string | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt?: string | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  sizes?: {
    navLogo?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    navUserImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    contestImage?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    userProfile?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    square?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    sixteenByNineMedium?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contest".
 */
export interface Contest {
  id: string;
  title: string;
  product_price: number;
  product_type: 'Car' | 'Bike' | 'Mobile' | 'Laptop' | 'Test';
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  hero_description?: string | null;
  img: string | Media;
  images: {
    product_images: string | Media;
    id?: string | null;
  }[];
  description_html?: string | null;
  contest_no: string;
  tickets_purchased?: number | null;
  ticket_price: number;
  day_remain: string;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  reached_threshold?: boolean | null;
  threshold_reached_date?: string | null;
  contest_timer_status?: boolean | null;
  contest_status?: boolean | null;
  winner_ticket?: {
    relationTo: 'winner';
    value: string | Winner;
  } | null;
  show_in_hero?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "winner".
 */
export interface Winner {
  id: string;
  contest?: {
    relationTo: 'contest';
    value: string | Contest;
  } | null;
  ticket?: {
    relationTo: 'tickets';
    value: string | Ticket;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tickets".
 */
export interface Ticket {
  id: string;
  contest_id: {
    relationTo: 'contest';
    value: string | Contest;
  };
  purchased_by?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  ticket_number?: string | null;
  ticket_price: number;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cart".
 */
export interface Cart {
  id: string;
  tickets: number;
  total_price: number;
  contest_id: {
    relationTo: 'contest';
    value: string | Contest;
  };
  user_id?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "contact".
 */
export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blog".
 */
export interface Blog {
  id: string;
  title: string;
  tag?: ('Loot Tips' | 'Mega Millions' | 'Loot' | 'Winners' | 'Bonus') | null;
  author_name?: string | null;
  author_image?: string | Media | null;
  short_desc: string;
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  img: string | Media;
  content_html?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tags".
 */
export interface Tag {
  id: string;
  tag: string;
  img: string | Media;
  is_coming_soon?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "wishlist".
 */
export interface Wishlist {
  id: string;
  contest: {
    relationTo: 'contest';
    value: string | Contest;
  };
  user?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "transaction".
 */
export interface Transaction {
  id: string;
  user?: {
    relationTo: 'users';
    value: string | User;
  } | null;
  type_of_transaction?: ('deposit' | 'withdraw' | 'tickets_purchased' | 'refund') | null;
  amount?: number | null;
  date?: string | null;
  status?: string | null;
  payment_method?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  tickets_transactions?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "trash".
 */
export interface Trash {
  id: string;
  value:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  collectionName?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  icon: string | Media;
  nav_links?:
    | {
        name: string;
        link: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  icon: string | Media;
  nav_links?:
    | {
        name: string;
        link: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about".
 */
export interface About {
  id: string;
  title: string;
  description: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  description_html?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "team".
 */
export interface Team {
  id: string;
  title: string;
  description: string;
  team?:
    | {
        user_image: string | Media;
        name: string;
        designation: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "testimonial".
 */
export interface Testimonial {
  id: string;
  title: string;
  description: string;
  reviews?:
    | {
        user?: (string | null) | User;
        contest?: (string | null) | Contest;
        review?: string | null;
        rating?: number | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "features".
 */
export interface Feature {
  id: string;
  title: string;
  description: string;
  features?:
    | {
        feature_image: string | Media;
        name: string;
        description: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportInfo".
 */
export interface SupportInfo {
  id: string;
  caption: string;
  title: string;
  sub_title: string;
  support_img: string | Media;
  heading1: string;
  description1: string;
  guide_img: string | Media;
  heading2: string;
  description2: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "faq".
 */
export interface Faq {
  id: string;
  title?: string | null;
  description?: string | null;
  faqs?:
    | {
        faq_type?: string | null;
        faq?:
          | {
              question: string;
              answer: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "howToPlayInfo".
 */
export interface HowToPlayInfo {
  id: string;
  caption: string;
  title: string;
  sub_title: string;
  step?:
    | {
        icon: string | Media;
        step_number: number;
        title: string;
        sub_title: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}