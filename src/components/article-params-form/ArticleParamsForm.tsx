import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect } from 'react';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type Props = {
	articleState: typeof defaultArticleState;
	onApply: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ articleState, onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draftState, setDraftState] = useState(articleState);

	useEffect(() => {
		if (isOpen) setDraftState(articleState);
	}, [isOpen, articleState]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply(draftState);
					}}
					onReset={(e) => {
						e.preventDefault();
						setDraftState(defaultArticleState);
						onApply(defaultArticleState);
					}}>
					<Select
						title='Шрифт'
						selected={draftState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setDraftState((prev) => ({
								...prev,
								fontFamilyOption: option,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						onChange={(option) =>
							setDraftState((prev) => ({
								...prev,
								fontSizeOption: option,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
