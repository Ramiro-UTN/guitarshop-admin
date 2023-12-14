interface HeadingProps {
  tittle: string
  description: string
}

const Heading: React.FC<HeadingProps> = ({
  tittle,
  description
}) => {
  return (
    <div>
      <h2 className="font-bold text-3xl">{tittle}</h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default Heading;