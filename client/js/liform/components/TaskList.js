import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

const TaskList = ({ tasks }) => {
    return (
        <table className="table" style={{ 'margin-top': '2em' }}>
            <tbody>
                { tasks.map((task, idx) => {
                    return (
                        <tr key={idx}>
                            <td>
                                {task.name}
                            </td>
                            <td>
                                {task.description}
                            </td>
                            <td>
                                {moment(task.dueTo).format('dddd, MMMM Do YYYY, h:mm:ss a')}

                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasksState.tasks,
    }
}

export default connect(mapStateToProps)(TaskList)
