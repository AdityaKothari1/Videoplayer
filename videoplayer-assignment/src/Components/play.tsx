import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface DraggablePlaylistItemProps {
    videoUrl: string;
    title: string;
    description: string;
    thumb: string;
    onVideoClick: (src: string, title: string, description: string, thumb: string) => void;
}

const DraggablePlaylistItem: React.FC<DraggablePlaylistItemProps> = ({
    videoUrl,
    title,
    description,
    thumb,
    onVideoClick
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: title });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    console.log(videoUrl)
    return (
        <div ref={setNodeRef} style={style}  {...attributes} {...listeners} className='w-full h-[250x] rounded-lg'>
            <div className='w-full object-cover group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30s'
            >

                <img
                    className="rounded-lg"
                    onClick={() => onVideoClick(videoUrl, title, description, thumb)}
                    src={thumb}
                    alt=""
                />
                <h1 className="mt-2">{title}</h1>
            </div>
        </div>
    );
};

export default DraggablePlaylistItem;
