/**
 * The function `fetchAndSuspend` returns an object with a `read` method that suspends and throws a
 * promise until the data is fetched, and then returns the fetched data.
 * @param {T} callback - The `callback` parameter is a function that returns a promise. It is a generic
 * type `T` that extends a function that returns a promise of any type.
 * @returns An object with a `read` method that can be used to retrieve the result of the asynchronous
 * operation. The `read` method throws a `suspender` if the operation is still pending, throws the
 * `result` if the operation failed with an error, and returns the `result` if the operation succeeded.
 */
const fetchAndSuspend = <T extends () => Promise<any>>(callback: T) => {
	let status = "pending";
	let result: Awaited<ReturnType<T>> = undefined!;

	const suspender = callback()
		.then((data) => {
			status = "success";
			result = data;
		})
		.catch((e) => {
			status = "error";
			result = e;
		});

	return {
		read() {
			if (status === "pending") {
				throw suspender;
			} else if (status === "error") {
				throw result;
			} else if (status === "success") {
				return result;
			}
		},
	};
};

export { fetchAndSuspend };
