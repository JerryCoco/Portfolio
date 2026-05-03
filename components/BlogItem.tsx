interface BlogItemProps {
  title: string;
  date: string;
  onClick?: () => void;
}

export default function BlogItem({ title, date, onClick }: BlogItemProps) {
  return (
    <div className="blog-item" onClick={onClick}>
      <span className="blog-item-title">{title}</span>
      <span className="blog-item-date">{date}</span>
    </div>
  );
}