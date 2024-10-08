import React, { useState, useEffect } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axiosInstance from '../utils/axiosInstance';
const port = process.env.REACT_APP_URL;

const SortTable = ({ data, sortTableOpen, handleOpenSortTable, tableName, updateRoute, Id, orderKey = 'order', titleKey = 'title' }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const sortedData = [...data];

        sortedData.sort((a, b) => {
            if (a[orderKey] === 0 && b[orderKey] > 0) return 1;
            if (b[orderKey] === 0 && a[orderKey] > 0) return -1;
            if (a[orderKey] === b[orderKey]) return a.id - b.id;
            return a[orderKey] - b[orderKey];
        });
        setItems(sortedData);
    }, [data, orderKey]);

    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setItems(updatedItems);
    };

    const handleSaveSorting = async () => {
        const itemsToUpdate = items.filter((item, index) => {
            const originalItem = data.find(d => d.id === item.id);
            return originalItem && index + 1 !== originalItem[orderKey];
        });

        const updatedOrder = itemsToUpdate.map((item, index) => ({
            id: item.id,
            [orderKey]: items.findIndex(i => i.id === item.id) + 1,
        }));


        try {
            if (updatedOrder.length > 0) {
                await axiosInstance.put(`${port}/${updateRoute}/${Id}`, { items: updatedOrder });
            }
            handleOpenSortTable();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };




    const SortableItem = ({ data, index, moveItem }) => {
        const [, ref] = useDrag({
            type: 'MODULE',
            item: { index },
        });

        const [, drop] = useDrop({
            accept: 'MODULE',
            hover: (draggedItem) => {
                if (draggedItem.index !== index) {
                    moveItem(draggedItem.index, index);
                    draggedItem.index = index;
                }
            },
        });

        return (
            <div ref={(node) => ref(drop(node))} className="module-lesson" style={{ cursor: "move", marginBottom: "10px" }}>
                <div className="lesson-title" style={{ userSelect: "none" }}>
                    {data[titleKey] != null ? data[titleKey] : data.course_quize_lesson[titleKey]}
                </div>
            </div>
        );
    };

    return (
        sortTableOpen && (
            <DndProvider backend={HTML5Backend}>
                <div className="modal">
                    <div className="add-lesson-container">
                        <h5 style={{ marginBottom: "20px" }}>Sort {tableName}</h5>
                        {items.length > 0 ? (
                            items.map((data, index) => {
                                return (
                                    <SortableItem key={data.id} index={index} data={data} moveItem={moveItem} />
                                )
                            })
                        ) : (
                            <p>No data found</p>
                        )}
                        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                            <button onClick={handleSaveSorting} className="primary-btn">
                                Save Sorting
                            </button>
                            <button onClick={handleOpenSortTable} className="secondary-btn">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </DndProvider>
        )
    );
};

export default SortTable;
