import Link from "next/link";

const Social = ({ items }) => {
  return (
    <ul className="social-link-list">
      {items?.map(([Item, url], i) => (
        <li key={i}>
          <Link href={url}>
            <i>
              <Item />
            </i>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Social;
