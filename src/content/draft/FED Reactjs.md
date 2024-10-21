title: FED Reacts
date: 2020/04/10 01:51:04
categories:
- dev
- front-end

tags:
- react
---
# Life Cycle

![](https://miro.medium.com/max/4532/1*lINPzI9FsJnay2_fm4vmzA.png)

|                           | setState | props |
| ------------------------- | -------- | ----- |
| componentWillReveiceProps |          | 🐶     |
| shouldComponentUpdate     | 🐶        | 🐶     |
| componentWillUpdate       | 🐶        | 🐶     |
| render                    | 🐶        | 🐶     |
| componentDidUpdate        | 🐶        | 🐶     |

```
  getSnapshotBeforeUpdate(prevProps, prevState) {
  
  }
  static getDerivedStateFromProps(props, state) {    
			return {}
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnMount() {}
```

# Route

# Inline CSS style component
```javascript
const ReactionInfoContainer = styled.div`
    width: 95%;
    margin-top: 38px;
    position: absolute;
    bottom: ${props => `${props.bottom}px`};
    height: ${props => `${props.height !== null ? props.height : 'auto'}`} 
`;

const OtherContainert = styled(props =><Form {...props}>)`
    width: 12px;
`;
```
# Component

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';


const ReactionInfoContainer = styled.div`
    width: 95%;
    margin-top: 38px;
    position: absolute;
    bottom: ${props => `${props.bottom}px`};
    height: ${props => `${props.height !== null ? props.height : 'auto'}`} 
`;


export default class xxx extends React.PureComponent<IProps,IStates>{
  constructs(props){
    super(props);
  }
  render():React.ReactNode{
    return (
    			<ReactionInfoContainer
                    height={INFO_CONTAINER_HEIGHT_HIDE}
                    bottom={this.props.isPlayground ? '0' : SCHEME_BOTTOM_BAR}
                >
               
          </ReactionInfoContainer>)
  }
}
```
# react-redux

* action
* Statetoprops

```react
interface IDispatchProps {
    userLogout: () => void;
}
interface IStateProps {
    taskInfo?: TaskInfo;
}
    
this.props.taskInfo;    

const mapStateToProps = (state: IStoreState) => {
    const { modalProps } = state.modal;
    const { role } = state.role;
    const { taskInfo } = state.chemiriseTasks;
    return {
        taskInfo,
        modalProps,
        role,
    };
};

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
    return {
        userLogout: () => {
            dispatch(userLogout());
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PageHeaderContainer);
```

# useHook

# Geninic

```shell
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}

console.log(identity(68, "Semlinker"));

#
interface GenericInterface<U> {
  value: U
  getIdentity: () => U
}

class IdentityClass<T> implements GenericInterface<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getIdentity(): T {
    return this.value
  }

}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>("Semlinker!");
console.log(myStringClass.getIdentity()); // Semlinker!

#
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
#
async function stringPromise() {
  return "Hello, Semlinker!";
}

interface Person {
  name: string;
  age: number;
}

async function personPromise() {
  return { name: "Semlinker", age: 30 } as Person;
}

type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;

type extractStringPromise = UnPromisify<typeof stringPromise>; // string
type extractPersonPromise = UnPromisify<typeof personPromise>; // Person



# tools
type Partial<T> = {
    [P in keyof T]?: T[P];
};
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
type Exclude<T, U> = T extends U ? never : T;
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

```



# Tips

```
# nginx .conf
server {
  listen 80;
  server_name 10.1.30.170;
  root  /home/jik1992/project/marking;
  location / {
		try_files $uri $uri/ /index.html;
  }
}
```



## best practices

* https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#side-effects-on-props-change
* https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

# Quote
* https://juejin.im/post/5b6f1800f265da282d45a79a



