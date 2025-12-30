import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SectionWrapperProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionWrapper = ({ id, title, icon, children }: SectionWrapperProps) => {
  return (
    <div id={id} className="scroll-mt-32">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default SectionWrapper;
