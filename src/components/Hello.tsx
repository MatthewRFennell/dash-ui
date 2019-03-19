import * as React from 'react'

export interface HelloProps { compiler: string; framework: string }

// 'HelloProps' describes the shape of props.
// Stateless function component so SFC is used.
export const Hello : React.SFC<HelloProps> = (props) => {
    return (
        <h1>Hello from {props.compiler} and {props.framework}!</h1>
    )
}
