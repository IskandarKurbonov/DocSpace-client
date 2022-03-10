﻿/*
 *
 * (c) Copyright Ascensio System Limited 2010-2021
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/


using ASC.Common.Logging;

using Microsoft.Extensions.Options;

namespace ASC.ActiveDirectory.Base.Settings
{
    public abstract class LdapSettingsChecker : IDisposable
    {
        protected ILog log;

        public LdapUserImporter LdapImporter { get; private set; }

        public LdapSettings Settings
        {
            get { return LdapImporter.Settings; }
        }

        protected LdapSettingsChecker(IOptionsMonitor<ILog> option)
        {
            log = option.Get("ASC");
        }

        public void Init(LdapUserImporter importer)
        {
            LdapImporter = importer;
        }

        public abstract LdapSettingsStatus CheckSettings();

        public void Dispose()
        {
            LdapImporter.Dispose();
        }
    }
}
