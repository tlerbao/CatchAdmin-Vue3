import { AuthStore } from "@/stores/modules/auth";
import type { Directive, DirectiveBinding } from "vue";

const action: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		const permissions = AuthStore().authPermissions;

		if (value && typeof value === "string") {
			const hasAction = permissions.some(permission => {
				const action = value.indexOf(".") !== -1 ? value.replace(".", "@") : value;
				const actionArr = action.split("@");
				// 如果未设置模块
				if (actionArr.length === 2) {
					return permission.permission_mark === action;
				} else {
					// 设置模块 防止模块间的 action 重复
					return permission.module && action === permission.permission_mark;
				}
			});
			if (!hasAction) {
				el.parentNode && el.parentNode.removeChild(el);
			}
		} else {
			throw new Error(`need action! Like v-action="controller@action" || v-action="controller.action" `);
		}
	}
};

export default action;
