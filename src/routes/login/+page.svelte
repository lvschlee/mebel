<script lang="ts">
	import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-svelte';

	type Tab = 'login' | 'register';
	let activeTab = $state<Tab>('login');

	// Login form
	let loginEmail = $state('');
	let loginPassword = $state('');
	let loginPasswordVisible = $state(false);
	let loginLoading = $state(false);
	let loginError = $state('');

	// Register form
	let regName = $state('');
	let regPhone = $state('');
	let regEmail = $state('');
	let regPassword = $state('');
	let regPasswordConfirm = $state('');
	let regPasswordVisible = $state(false);
	let regPasswordConfirmVisible = $state(false);
	let regLoading = $state(false);
	let regError = $state('');
	let regSuccess = $state(false);

	// Reset password modal
	let resetModalOpen = $state(false);
	let resetEmail = $state('');
	let resetLoading = $state(false);
	let resetSent = $state(false);

	function handleReset(e: Event) {
		e.preventDefault();
		if (!resetEmail) return;
		resetLoading = true;
		setTimeout(() => {
			resetLoading = false;
			resetSent = true;
		}, 1000);
	}

	function closeResetModal() {
		resetModalOpen = false;
		resetSent = false;
		resetEmail = '';
	}

	function handleLogin(e: Event) {
		e.preventDefault();
		loginError = '';
		if (!loginEmail || !loginPassword) {
			loginError = 'Пожалуйста, заполните все поля.';
			return;
		}
		loginLoading = true;
		setTimeout(() => {
			loginLoading = false;
			loginError = 'Неверный email или пароль.';
		}, 1000);
	}

	function handleRegister(e: Event) {
		e.preventDefault();
		regError = '';
		if (!regName || !regEmail || !regPhone || !regPassword || !regPasswordConfirm) {
			regError = 'Пожалуйста, заполните все обязательные поля.';
			return;
		}
		if (regPassword !== regPasswordConfirm) {
			regError = 'Пароли не совпадают.';
			return;
		}
		if (regPassword.length < 8) {
			regError = 'Пароль должен содержать не менее 8 символов.';
			return;
		}
		regLoading = true;
		setTimeout(() => {
			regLoading = false;
			regSuccess = true;
		}, 1000);
	}
</script>

<svelte:head>
	<title>{activeTab === 'login' ? 'Войти' : 'Регистрация'} — Мебель Урала</title>
</svelte:head>

<div class="min-h-[calc(100vh-200px)] bg-white flex justify-center px-4 pt-16 pb-12">
	<div class="w-full max-w-210">

		<!-- Карточка -->
		<div class="bg-white overflow-hidden">

			<!-- Табы -->
			<div class="flex justify-center gap-8 border-b border-slate-200">
				<button
					class="relative px-4 py-4 text-base font-semibold transition-colors
						{activeTab === 'login' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}"
					onclick={() => { activeTab = 'login'; loginError = ''; }}
				>
					Войти
					{#if activeTab === 'login'}
						<span class="absolute bottom-0 -left-px -right-px h-0.5 bg-emerald-600"></span>
					{/if}
				</button>
				<button
					class="relative px-4 py-4 text-base font-semibold transition-colors
						{activeTab === 'register' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}"
					onclick={() => { activeTab = 'register'; regError = ''; regSuccess = false; }}
				>
					Регистрация
					{#if activeTab === 'register'}
						<span class="absolute bottom-0 -left-px -right-px h-0.5 bg-emerald-600"></span>
					{/if}
				</button>
			</div>

			<!-- ФОРМА ВХОДА -->
			{#if activeTab === 'login'}
			<div class="px-8 pt-10 pb-8 max-w-md mx-auto">
					<form onsubmit={handleLogin} novalidate class="flex flex-col gap-5">
						<div class="flex flex-col gap-1.5">
							<label for="login-email" class="text-sm font-medium text-slate-700">Email</label>
							<div class="relative">
								<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
									<Mail size={16} />
								</span>
								<input
									id="login-email"
									type="email"
									bind:value={loginEmail}
									placeholder="example@mail.ru"
									autocomplete="email"
									class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
								/>
							</div>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="login-password" class="text-sm font-medium text-slate-700">Пароль</label>
							<div class="relative">
								<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
									<Lock size={16} />
								</span>
								<input
									id="login-password"
									type={loginPasswordVisible ? 'text' : 'password'}
									bind:value={loginPassword}
									placeholder="Введите пароль"
									autocomplete="current-password"
									class="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
								/>
								<button
									type="button"
									onclick={() => (loginPasswordVisible = !loginPasswordVisible)}
									class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
									aria-label={loginPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
								>
									{#if loginPasswordVisible}<EyeOff size={16} />{:else}<Eye size={16} />{/if}
								</button>
							</div>
						</div>

						<button type="button" onclick={() => (resetModalOpen = true)} class="text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors self-end">
							Забыли пароль?
						</button>

						{#if loginError}
							<p class="text-sm text-red-500 bg-red-50 border border-red-100 rounded-full px-4 py-3">
								{loginError}
							</p>
						{/if}

						<button
							type="submit"
							disabled={loginLoading}
							class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-full transition-colors mt-1"
						>
							{loginLoading ? 'Выполняется вход...' : 'Войти'}
						</button>

						<!-- Разделитель -->
						<div class="flex items-center gap-3 my-1">
							<div class="flex-1 h-px bg-slate-200"></div>
							<span class="text-xs text-slate-400">или войдите через</span>
							<div class="flex-1 h-px bg-slate-200"></div>
						</div>

						<!-- Социальные сети -->
						<div class="flex gap-3">
							<button type="button" class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12.785 16.241c-4.869 0-7.639-3.337-7.752-8.888h2.44c.076 4.076 1.878 5.805 3.303 6.159V7.353h2.298v3.517c1.408-.152 2.889-1.76 3.388-3.517h2.298c-.385 2.163-1.992 3.771-3.134 4.422 1.142.531 2.97 1.938 3.67 4.466h-2.527c-.547-1.71-1.908-3.032-3.695-3.198v3.198h-.289z" fill="#0077FF"/>
								</svg>
								ВКонтакте
							</button>
							<button type="button" class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#FC3F1D"/>
									<path d="M13.116 8.015h1.428c.294 0 .356.14.356.294 0 .279-.441 1.68-.441 1.68s-.043.136.07.178c.099.037.234-.057.234-.057s1.4-1.178 1.96-1.178c.406 0 .532.222.532.5 0 .39-.49 1.58-.49 1.58s-.1.263.113.333c.212.07.742-.398 1.078-.693.195-.171.378-.289.574-.289.392 0 .47.278.47.5 0 .473-.862 1.247-1.47 1.74-.393.317-.658.64-.658 1.012 0 .448.336.636.7.636.49 0 1.05-.31 1.05-.31l.14.392s-.672.5-1.4.5c-.644 0-1.176-.35-1.176-1.05 0-.532.336-.924.77-1.26.42-.322.868-.672.868-1.008 0-.154-.084-.238-.238-.238-.336 0-.952.588-1.344.952-.308.28-.588.448-.868.448-.392 0-.546-.28-.546-.56 0-.406.504-1.54.504-1.54H12.3c-.35 0-.616.112-.784.448l-1.022 2.044c-.224.448-.448.63-.784.63-.294 0-.476-.154-.476-.434 0-.168.07-.378.168-.63l.994-2.38C10.578 9.37 10.9 9 11.5 9h.868l.224-.56c.154-.378.392-.63.784-.63h.476l-.406.98c-.056.154.014.225.168.225z" fill="white"/>
								</svg>
								Яндекс
							</button>
							<button type="button" class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12" cy="12" r="10" fill="#F7931E"/>
									<circle cx="12" cy="9" r="3" fill="white"/>
									<path d="M12 13c-2.5 0-4.5 1.3-4.5 2.5V16.5h9V15.5c0-1.2-2-2.5-4.5-2.5z" fill="white"/>
									<rect x="10" y="16" width="4" height="3" rx="1" fill="white"/>
								</svg>
								ОК
							</button>
						</div>

						<p class="text-center text-sm text-slate-500">
							Ещё нет аккаунта?
							<button
								type="button"
								onclick={() => (activeTab = 'register')}
								class="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
							>
								Зарегистрируйтесь
							</button>
						</p>
					</form>
				</div>

				<!-- ФОРМА РЕГИСТРАЦИИ -->
				{:else if !regSuccess}
				<div class="px-8 pt-10 pb-8 max-w-md mx-auto">
					<form onsubmit={handleRegister} novalidate class="flex flex-col gap-4">
						<div class="flex flex-col gap-1.5">
							<label for="reg-name" class="text-sm font-medium text-slate-700">Имя и фамилия <span class="text-red-400">*</span></label>
							<div class="relative">
								<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><User size={16} /></span>
								<input id="reg-name" type="text" bind:value={regName} placeholder="Иван Иванов" autocomplete="name"
									class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" />
							</div>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="reg-phone" class="text-sm font-medium text-slate-700">Телефон <span class="text-red-400">*</span></label>
							<div class="relative">
								<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Phone size={16} /></span>
								<input id="reg-phone" type="tel" bind:value={regPhone} placeholder="+7 (999) 000-00-00" autocomplete="tel"
									class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" />
							</div>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="reg-email" class="text-sm font-medium text-slate-700">Email <span class="text-red-400">*</span></label>
							<div class="relative">
								<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Mail size={16} /></span>
								<input id="reg-email" type="email" bind:value={regEmail} placeholder="example@mail.ru" autocomplete="email"
									class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" />
							</div>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="reg-password" class="text-sm font-medium text-slate-700">Пароль <span class="text-red-400">*</span></label>
							<div class="relative">
								<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Lock size={16} /></span>
								<input id="reg-password" type={regPasswordVisible ? 'text' : 'password'} bind:value={regPassword}
									placeholder="Минимум 8 символов" autocomplete="new-password"
									class="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" />
								<button type="button" onclick={() => (regPasswordVisible = !regPasswordVisible)}
									class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
									aria-label={regPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}>
									{#if regPasswordVisible}<EyeOff size={16} />{:else}<Eye size={16} />{/if}
								</button>
							</div>
						</div>

						<div class="flex flex-col gap-1.5">
							<label for="reg-password-confirm" class="text-sm font-medium text-slate-700">Повторите пароль <span class="text-red-400">*</span></label>
							<div class="relative">
								<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Lock size={16} /></span>
								<input id="reg-password-confirm" type={regPasswordConfirmVisible ? 'text' : 'password'} bind:value={regPasswordConfirm}
									placeholder="Повторите пароль" autocomplete="new-password"
									class="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition" />
								<button type="button" onclick={() => (regPasswordConfirmVisible = !regPasswordConfirmVisible)}
									class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
									aria-label={regPasswordConfirmVisible ? 'Скрыть пароль' : 'Показать пароль'}>
									{#if regPasswordConfirmVisible}<EyeOff size={16} />{:else}<Eye size={16} />{/if}
								</button>
							</div>
						</div>

						{#if regError}
							<p class="text-sm text-red-500 bg-red-50 border border-red-100 rounded-full px-4 py-3">
								{regError}
							</p>
						{/if}

						<p class="text-xs text-slate-400 leading-relaxed">
							Регистрируясь, вы соглашаетесь с
							<a href="/terms" class="text-emerald-600 hover:underline">условиями использования</a>
							и
							<a href="/privacy" class="text-emerald-600 hover:underline">политикой конфиденциальности</a>.
						</p>

						<button
							type="submit"
							disabled={regLoading}
							class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-full transition-colors"
						>
							{regLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
						</button>

						<!-- Разделитель -->
						<div class="flex items-center gap-3 my-1">
							<div class="flex-1 h-px bg-slate-200"></div>
							<span class="text-xs text-slate-400">или зарегистрируйтесь через</span>
							<div class="flex-1 h-px bg-slate-200"></div>
						</div>

						<!-- Социальные сети -->
						<div class="flex gap-3">
							<button type="button" class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12.785 16.241c-4.869 0-7.639-3.337-7.752-8.888h2.44c.076 4.076 1.878 5.805 3.303 6.159V7.353h2.298v3.517c1.408-.152 2.889-1.76 3.388-3.517h2.298c-.385 2.163-1.992 3.771-3.134 4.422 1.142.531 2.97 1.938 3.67 4.466h-2.527c-.547-1.71-1.908-3.032-3.695-3.198v3.198h-.289z" fill="#0077FF"/>
								</svg>
								ВКонтакте
							</button>
							<button type="button" class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" fill="#FC3F1D"/>
									<path d="M13.116 8.015h1.428c.294 0 .356.14.356.294 0 .279-.441 1.68-.441 1.68s-.043.136.07.178c.099.037.234-.057.234-.057s1.4-1.178 1.96-1.178c.406 0 .532.222.532.5 0 .39-.49 1.58-.49 1.58s-.1.263.113.333c.212.07.742-.398 1.078-.693.195-.171.378-.289.574-.289.392 0 .47.278.47.5 0 .473-.862 1.247-1.47 1.74-.393.317-.658.64-.658 1.012 0 .448.336.636.7.636.49 0 1.05-.31 1.05-.31l.14.392s-.672.5-1.4.5c-.644 0-1.176-.35-1.176-1.05 0-.532.336-.924.77-1.26.42-.322.868-.672.868-1.008 0-.154-.084-.238-.238-.238-.336 0-.952.588-1.344.952-.308.28-.588.448-.868.448-.392 0-.546-.28-.546-.56 0-.406.504-1.54.504-1.54H12.3c-.35 0-.616.112-.784.448l-1.022 2.044c-.224.448-.448.63-.784.63-.294 0-.476-.154-.476-.434 0-.168.07-.378.168-.63l.994-2.38C10.578 9.37 10.9 9 11.5 9h.868l.224-.56c.154-.378.392-.63.784-.63h.476l-.406.98c-.056.154.014.225.168.225z" fill="white"/>
								</svg>
								Яндекс
							</button>
							<button type="button" class="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12" cy="12" r="10" fill="#F7931E"/>
									<circle cx="12" cy="9" r="3" fill="white"/>
									<path d="M12 13c-2.5 0-4.5 1.3-4.5 2.5V16.5h9V15.5c0-1.2-2-2.5-4.5-2.5z" fill="white"/>
									<rect x="10" y="16" width="4" height="3" rx="1" fill="white"/>
								</svg>
								ОК
							</button>
						</div>

						<p class="text-center text-sm text-slate-500">
							Уже есть аккаунт?
							<button type="button" onclick={() => (activeTab = 'login')}
								class="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
								Войти
							</button>
						</p>
					</form>
				</div>

				<!-- УСПЕШНАЯ РЕГИСТРАЦИЯ -->
				{:else}
					<div class="flex flex-col items-center gap-4 py-4 text-center">
						<div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
							<svg class="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<div>
							<h2 class="text-lg font-bold text-slate-900 mb-1">Аккаунт создан!</h2>
							<p class="text-sm text-slate-500">Добро пожаловать в Мебель Урала. Теперь вы можете войти в свой аккаунт.</p>
						</div>
						<button
							onclick={() => { activeTab = 'login'; regSuccess = false; }}
							class="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-full transition-colors"
						>
							Войти
						</button>
					</div>
				{/if}
		</div>

	</div>
</div>

<!-- Модал: восстановление пароля -->
{#if resetModalOpen}
<div
	class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
	role="dialog"
	aria-modal="true"
	onclick={(e) => { if (e.target === e.currentTarget) closeResetModal(); }}
>
	<div class="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 flex flex-col gap-6">
		{#if !resetSent}
			<div class="flex flex-col gap-1.5">
				<h2 class="text-xl font-bold text-slate-900">Восстановление пароля</h2>
				<p class="text-sm text-slate-500">Введите email, привязанный к аккаунту.<br>Мы пришлём ссылку для сброса пароля.</p>
			</div>

			<form onsubmit={handleReset} novalidate class="flex flex-col gap-4">
				<div class="relative">
					<span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
						<Mail size={16} />
					</span>
					<input
						type="email"
						bind:value={resetEmail}
						placeholder="Email"
						autocomplete="email"
						class="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-full text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition"
					/>
				</div>
				<button
					type="submit"
					disabled={resetLoading}
					class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-full transition-colors"
				>
					{resetLoading ? 'Отправка...' : 'Отправить инструкцию →'}
				</button>
			</form>

			<button onclick={closeResetModal} class="text-sm text-slate-500 hover:text-slate-700 transition-colors self-center">
				Вернуться ко входу
			</button>
		{:else}
			<div class="flex flex-col items-center gap-4 text-center">
				<div class="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
					<Mail size={24} class="text-emerald-600" />
				</div>
				<div>
					<h2 class="text-xl font-bold text-slate-900 mb-1">Письмо отправлено</h2>
					<p class="text-sm text-slate-500">Проверьте почту <span class="font-medium text-slate-700">{resetEmail}</span> и перейдите по ссылке из письма.</p>
				</div>
				<button onclick={closeResetModal} class="text-sm text-slate-500 hover:text-slate-700 transition-colors">
					Вернуться ко входу
				</button>
			</div>
		{/if}
	</div>
</div>
{/if}
