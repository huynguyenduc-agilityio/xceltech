import React from 'react';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-xl text-black-soft">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link to={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && '>'}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
