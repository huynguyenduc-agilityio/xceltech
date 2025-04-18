import { Button } from '@/components';
import { PdfIcon } from '@/icons';

interface ViewDocumentsProps {
  files?: { name: string }[];
  onBackJob: () => void;
}

const ViewDocument = ({ files = [], onBackJob }: ViewDocumentsProps) => {
  return (
    <>
      <h2 className="text-lg font-bold mb-[50px]">
        <span
          className="cursor-pointer hover:text-secondary"
          onClick={onBackJob}
        >
          Job Details
        </span>{' '}
        / View Documents
      </h2>
      {files.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 text-black-default">
            {files.map((doc) => (
              <div
                key={doc.name}
                className="flex flex-col items-center w-full justify-center p-7 bg-blue-light rounded-lg"
              >
                <PdfIcon />
                <p className="text-base text-center mt-5 truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {doc.name}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button
              size="md"
              className="px-11 py-4 bg-green-primary hover:bg-green-primary/90 rounded-lg"
            >
              Download ALL (Zip)
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <span className="text-lg">Not found documents</span>
        </div>
      )}
    </>
  );
};

export default ViewDocument;
