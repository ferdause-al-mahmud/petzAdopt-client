
import Skeleton from 'react-loading-skeleton';

const TableSkeleton = () => {
    return (
        <div>
            <div className="mt-8 overflow-x-auto">
                <table className="w3-table-all">
                    <thead>
                        <tr>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <th key={index}>
                                    <Skeleton width={100} height={20} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: 6 }).map((_, cellIndex) => (
                                    <td key={cellIndex}>
                                        <Skeleton width={100} height={20} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableSkeleton;