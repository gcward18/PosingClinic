import React from 'react';
import { useEffect } from 'react';
import { EntityAPI } from '../../apis/entity_apis';
import { useJudgeContext } from '../../components/contexts/JudgeContext';

/**
 * JudgeTable component fetches and displays a list of judges in a table format.
 * It uses the EntityAPI to retrieve the data and manages loading state and error handling.
 *
 * @returns {JSX.Element} A table displaying the judges' information.
 */
export default function JudgeTable() {
    const { judges, setJudges, setLoading } = useJudgeContext();

    useEffect(() => {
        const api = new EntityAPI('judges');
        async function fetchJudges() {
            setLoading(true);
            try {
                const data = await api.getAll();
                setJudges(data);
            } catch (error) {
                console.error('Error fetching judges:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchJudges();
    }, [setJudges, setLoading]);
    
    return (
        <table className="table table-striped table-bordered">
           <thead>
                <tr>
                    <th scope="col">Judge ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                </tr>
           </thead>
           <tbody>
                {judges.map((judge) => (
                    <tr key={judge.id}>
                        <td>{judge.id}</td>
                        <td>{judge.firstname}</td>
                        <td>{judge.lastname}</td>
                    </tr>
                ))}
           </tbody>
        </table>
    );
}
