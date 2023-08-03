# Frontend test - Deel - Part 2

1. What is the difference between Component and PureComponent? give an example where it might break my app.

> Difference between Component & PureComponent is that, Component will always re-render if its parent component re-renders. PureComponent will not re-render if props and state are still the same. <br>
> Because React is doing a soft check between previous & current state & props, React will make a mistake if your state or props are mutated but didn't change their reference.
> So, your app might brake if you have an non-primitive data (object, array,...) in your state or props, since non-primitive data can be mutated without changing it reference <br>
> If you still wan't to use this optimization, you can write pure functional component and wrap it in React.memo.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

> I don't have much experience with this combo, but would say that this could be problematic for this reasons:
>
> - If you store non-primitive data in Context, but not checking it correctly in ShouldComponentUpdate (you are using soft comparison)
> - If you refactored data that you are sending in Context, but forget to refactor ShouldComponentUpdate function. <br>
> - If you are sending data with Context in both ways (Parent -> Child & Child -> Parent), and you don't cover some edge case in ShouldComponentUpdate, potentially you can go into infinite re-rendering and in stack-overflow. <br><br>
>   So, as a conclusion, I would say that it could become complex for maintaining as components scale and change their logic.

3. Describe 3 ways to pass information from a component to its PARENT.

> 1. _With callback function_ <br>
>    You can pass data to your parent if you call parent-function in child component. You can pass your parent-function through props.
> 2. _With using Context or useContext_ <br>
>    You can do this by making your child component Context.Provider & using data as Context.Consumer in parent component.
> 3. _Using state management library_ <br>
>    By using some state management library (like Redux or little-state-machine,...), you can provide and consume date in your whole app. <br> > **Bonus:** You can create singleton service that you can use for state management, but why should you reinvent the wheel...

4. Give 2 ways to prevent components from re-rendering.

> 1. _Optimizing pure component to not re-render for same props or state._ <br>
>    You can use ShouldComponentRender/PureComponent for class components or React.memo for functional components
> 2. _Optimizing pure functions to not re-render a component for same data in function_<br>
>    You can use hooks like useMemo or useCallback to memoize your data and prevent re-rendering

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

> We use fragments to wrap multiple elements in one element without adding that one extra wrapper node/element.<br>
> I don't have an idea how it could break you app, and I hope I will learn after this questionary.

6. Give 3 examples of the HOC pattern.

> 1. Context.Consumer and Context.Provider
> 2. React.memo
> 3. Suspense

7. What's the difference in handling exceptions in promises, callbacks and
   async...await.

> I think best way to example it is through code, so here it is:

```javascript
// Promise - Using `catch()`
 somePromise().then(...).catch(/* Handle error */);
```

```javascript
// Callback - Wrapping an callback function in other function

// If we have this, and want to handel error that is thrown in callbackFunction
someFunction(callbackFunction);
// We should do this
someFunction(function errorHandler(...args) {
  try {
    callbackFunction(...args);
  } catch (error) {
    // Handle error
  }
});
```

```javascript
// Async...await - Using `try...catch`
async function someAsyncFunction() {
  try {
    await somePromise();
  } catch (error) {
    // Handle error
  }
}
```

8. How many arguments does setState take and why is it async.

> setState takes 2 arguments. First one is a new part of the state, and the next one is a callback function that will be called after state is updated. <br>
> When the state is updated, React will re-render your component, so if the setState was synchronous, probably you would have a lot of re-renders and your code after setState would be executed before re-rendering. <br>

9. List the steps needed to migrate a Class to Function Component.

> 0. I would write new component as a functional component and not refactor the existing so it is easier to test and compare.
> 1. Define Component as `function` <br>
>    eg. `class` -> `function`
> 2. Use `props` from `function` `arguments` <br>
>    eg. `this.props` -> `props`
> 3. Replace propTypes with typescript type of arguments <br>
>    eg. `propTypes` -> `interface ComponentNameProps...`
> 4. Update state management <br>
>    eg. `this.state` -> `useState`
> 5. Refactor `state` updating <br>
>    eg. `this.setState` -> `setSomeState` form `useState`
> 6. Replace lifecycle methods with hooks <br>
>    lifecycle methods -> `useEffect`
> 7. Remove `this` from usage <br>
>    eg. `this.someFunction` -> `function someFunction...`
> 8. Update rendering <br>
>    eg. `render(<>Elements</>) -> return (<>Elements</>)`
> 9. Update optimization practices from class to functional components <br>
>    eg. `PureComponent` -> `React.memo`
> 10. If I missed something, and your component is still not working properly, please feel free to Google it and find a solution. <br>
>     P.S. Also, before following my short list of steps, I would recommend you explore a little bit, read React documentation and a few articles on this topic.

10. List a few ways styles can be used with components.

> 1. Inline styles <br>
> 2. Style Languages and preprocessor (eg. CSS, SASS, LESS,...) <br>
> 3. styled-components <br>
> 4. Passing styles as Object through props of an element<br>
> 5. CSS frameworks (eg. Bootstrap, Tailwind,...) <br>

11. How to render an HTML string coming from the server.

> You can use `dangerouslySetInnerHTML` prop on a element, that accepts and object with `__html` key, and value of your HTML string. <br>
