/* eslint-disable react/prop-types */
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { AiOutlineDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import TableSkeleton from '../Skeleton/TableSkeleton';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
const PetTable = ({ refetch, isLoading, data }) => {
    const axiosSecure = useAxiosSecure();
    const [sorting, setSorting] = useState([])

    //upadate api
    const { mutateAsync: mutateAdopt } = useMutation({
        mutationFn: async (pet) => {
            try {
                const { data } = await axiosSecure.patch(`/pets/adopt/${pet._id}`);
                return data;
            } catch (error) {
                throw new Error("An error occurred");
            }
        },
        onSuccess: () => {
            toast.success('Pet marked as adopted successfully!');
        },
        onError: (error) => {
            console.error('Error updating pet:', error.message);
        }
    });

    //delete api

    const { mutateAsync: mutateDelete } = useMutation({
        mutationFn: async (pet) => {
            try {
                const { data } = await axiosSecure.delete(`/pets/delete/${pet._id}`);
                return data;
            } catch (error) {
                throw new Error("An error occurred");
            }
        },
        onSuccess: () => {
            console.log('Deleted successfully');

        },
        onError: (error) => {
            console.error('Error deleting pet:', error.message);
        }
    });
    // console.log(petData)
    const columns = [
        {
            header: 'Serial Number',

            accessorFn: (row, index) => index + 1,
        },
        {
            header: 'Pet Name',
            accessorKey: 'petName',
        },
        {
            header: 'Pet category',
            accessorKey: 'category',
        },
        {
            header: 'Pet image',
            accessorKey: 'petImage',
            cell: ({ getValue }) => <img src={getValue()} alt="Pet" style={{ width: '50px', height: '50px' }} />,
        }, {
            header: 'Adoption status',
            accessorKey: 'adopted',
            cell: ({ getValue }) => getValue() ? <p className='font-medium'>Adpoted</p> : <p className='font-medium text-green-500'>Not Adopted</p>,
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex flex-col md:flex-row gap-3'>
                    <Link to={`/dashboard/update-pet/${row.original._id}`} className='btn text-xl bg-orange-400'><GrUpdate /></Link>
                    <button className='btn text-xl bg-red-400' onClick={() => handleDelete(row.original)}><AiOutlineDelete /></button>
                    <button className='btn bg-green-400' onClick={() => handleAdopted(row.original)}>
                        {row.original.adopted ? 'Adopted' : 'Mark as Adopted'}
                    </button>
                </div>
            ),
        },

    ]


    const handleDelete = async (pet) => {

        // Delete pet logic here
        // console.log('Deleting pet:', pet)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateDelete(pet)
                refetch()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const handleAdopted = async (pet) => {
        // Mark pet as adopted logic here

        await mutateAdopt(pet)
        refetch()
    }

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting,
        },
        onSortingChange: setSorting,
    })
    if (isLoading) {
        return <>
            <TableSkeleton></TableSkeleton>
        </>
    }
    return (
        <div className='mt-8 text-[14px] md:text-xl w3-container overflow-x-auto'>
            <div className=' overflow-x-auto'>
                <table className='w3-table-all'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                { asc: '🔼', desc: '🔽' }[
                                                header.column.getIsSorted() ?? null
                                                ]
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={`mt-6  gap-6 ${data.length > 10 ? 'flex' : 'hidden'}`}>
                    <button className='btn' onClick={() => table.setPageIndex(0)}>First page</button>
                    <button
                        disabled={!table.getCanPreviousPage()}
                        className='btn' onClick={() => table.previousPage()}
                    >
                        Previous page
                    </button>
                    <button
                        disabled={!table.getCanNextPage()}
                        className='btn' onClick={() => table.nextPage()}
                    >
                        Next page
                    </button>
                    <button className='btn' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                        Last page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PetTable;