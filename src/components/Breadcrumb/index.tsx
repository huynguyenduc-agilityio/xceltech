import React from 'react';

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
          {/* TODO: Convert <a> to <Link> */}
          {item.href ? (
            <a href={item.href} className="hover:underline">
              {item.label}
            </a>
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
