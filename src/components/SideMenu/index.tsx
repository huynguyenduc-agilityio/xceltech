import { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

// Utils
import { cn } from '@/utils';

type ITabItem = {
  label: string;
  content?: ReactNode;
};

type ITabsProps = {
  tabs: ITabItem[];
};

const SideMenu = ({ tabs }: ITabsProps) => {
  return (
    <Tabs defaultValue={tabs[0].label} className="w-full h-full flex">
      <TabsList className="flex flex-col justify-start gap-5 w-[50%] h-full px-6 pt-9 pb-5 mr-[51px] rounded-[15px] bg-white">
        {tabs.map(({ label, content }) => (
          <TabsTrigger
            key={label}
            className={cn(
              'w-full h-[78px] rounded-[15px] bg-blue-light text-lg font-bold hover:bg-secondary hover:opacity-80 data-[state=active]:bg-secondary',
              !content ? 'opacity-50 cursor-not-allowed' : '',
            )}
            value={label}
            disabled={!content}
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="w-full bg-white rounded-[15px]">
        {tabs.map(({ label, content }) => (
          <TabsContent key={label} value={label} className="h-full">
            {content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};

export default SideMenu;
