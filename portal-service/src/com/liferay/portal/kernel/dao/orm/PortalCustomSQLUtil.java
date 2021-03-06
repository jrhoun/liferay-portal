/**
 * Copyright (c) 2000-2012 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portal.kernel.dao.orm;

import com.liferay.portal.kernel.security.pacl.permission.PortalRuntimePermission;

/**
 * @author Brian Wing Shun Chan
 */
public class PortalCustomSQLUtil {

	public static String get(String id) {
		return getPortalCustomSQL().get(id);
	}

	public static PortalCustomSQL getPortalCustomSQL() {
		PortalRuntimePermission.checkGetBeanProperty(PortalCustomSQLUtil.class);

		return _portalCustomSQL;
	}

	public void setPortalCustomSQL(PortalCustomSQL portalCustomSQL) {
		PortalRuntimePermission.checkSetBeanProperty(getClass());

		_portalCustomSQL = portalCustomSQL;
	}

	private static PortalCustomSQL _portalCustomSQL;

}