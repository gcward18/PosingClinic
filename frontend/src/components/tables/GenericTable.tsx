import React, { useState } from 'react';
import { useEffect } from 'react';
import { EntityAPI } from '../../apis/entity_apis';
import { useGenericContext } from '../../store/GenericContext';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
  } from '@mui/material';
  
/**
 * GenericTable component fetches and displays a list of Generics in a table format.
 * It uses the EntityAPI to retrieve the data and manages loading state and error handling.
 *
 * @returns {JSX.Element} A table displaying the Generics' information.
 */
export default function GenericTable() {
    const { data, loading } = useGenericContext();
    const [header, setHeader] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data.length) {
            const newHeader = Object.keys(data[0]);


            const newRows = data.map((datum) => (
                <TableRow key={datum.id}>
                  {newHeader.map((key) => (
                    <TableCell key={key}>{datum[key]}</TableCell>
                  ))}
                </TableRow>
              ));

            setHeader(newHeader);
            setRows(newRows);
            
        }
    }, [data])
    
    if (loading) return <CircularProgress />;
    return (
        <TableContainer  className="table table-striped table-bordered">
            <TableHead>
                <TableRow>
                {
                    header.map(key => (
                        <th key={key} scope="col">{key}</th>
                    ))
                }
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
        </TableContainer>
    );
}
