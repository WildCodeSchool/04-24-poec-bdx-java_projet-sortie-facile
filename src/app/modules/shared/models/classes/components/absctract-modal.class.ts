export abstract class AbstractModal {
	protected abstract onSubmit(): void;

	protected abstract onError(): void;

	protected abstract onReject(): void;

	protected abstract onAccept(): void;
}
