import { Link } from "react-router-dom";

const variants = {
  primary: "bg-gold text-charcoal hover:bg-fire hover:text-warmwhite",
  outline: "border border-gold text-gold hover:bg-gold hover:text-charcoal",
  ghost: "border border-warmwhite/40 text-warmwhite hover:border-gold hover:text-gold",
  dark: "bg-charcoal text-gold hover:bg-maroon",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  icon: Icon,
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {Icon && <Icon size={18} />}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {Icon && <Icon size={18} />}
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
}
