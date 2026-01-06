import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator/Separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type Props = {
	articleState: typeof defaultArticleState;
	onApply: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ articleState, onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draftState, setDraftState] = useState(articleState);
	const formRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) setDraftState(articleState);
	}, [isOpen, articleState]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(draftState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setDraftState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleChange = (key: keyof ArticleStateType, value: any) => {
		setDraftState((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<div className={styles.parametersContainer}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={draftState.fontFamilyOption}
							onChange={(opt) => handleChange('fontFamilyOption', opt)}
						/>
						<RadioGroup
							name=''
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={draftState.fontSizeOption}
							onChange={(opt) => handleChange('fontSizeOption', opt)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={draftState.fontColor}
							onChange={(opt) => handleChange('fontColor', opt)}
						/>
					</div>

					<Separator />

					<div className={styles.parametersContainer}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={draftState.backgroundColor}
							onChange={(opt) => handleChange('backgroundColor', opt)}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={draftState.contentWidth}
							onChange={(opt) => handleChange('contentWidth', opt)}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
