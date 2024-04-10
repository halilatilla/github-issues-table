import { Badge } from '@/components/ui/badge';
import { getReadableTextColor } from '@/lib/utils';

interface BadgeGithubProps {
  text: string;
  bgColor: string;
}

const BadgeGithub = ({ text, bgColor }: BadgeGithubProps) => {
  const textColor = getReadableTextColor(bgColor);

  return (
    <Badge
      style={{
        backgroundColor: `#${bgColor}`,
        color: textColor
      }}
    >
      {text}
    </Badge>
  );
};

export default BadgeGithub;
