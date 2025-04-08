import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

interface MenuCardProps {
  title: string;
  description: string;
  href: string;
  bgColor: string;
}

export function MenuCard({ title, description, href, bgColor }: MenuCardProps) {
  return (
    <Link href={href}>
      <Card
        className={`${bgColor} hover:bg-opacity-80 transition-colors cursor-pointer`}
      >
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-gray-700">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
