import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
// import { defaultArticleState } from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

// type Props = {
// 	articleState: typeof defaultArticleState;
// 	onApply: (state: typeof defaultArticleState) => void;
// };

export const ArticleParamsForm = () =>
	// { articleState, onApply }: Props
	{
		const [isOpen, setIsOpen] = useState(false);

		return (
			<>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => setIsOpen((prev) => !prev)}
				/>
				<aside className={clsx(styles.container, isOpen && styles.open)}>
					<form className={styles.form}>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</>
		);
	};
