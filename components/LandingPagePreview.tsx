"use client";

import React from "react";
import { Loader2, Eye, Code, ExternalLink } from "lucide-react";

interface BusinessData {
  businessName: string;
  industry: string;
  targetAudience: string;
  mainGoal: string;
  keyBenefits: string[];
  callToAction: string;
  contactInfo: string;
  brandColors: {
    primary: string;
    secondary: string;
  };
  tone: string;
}

interface GeneratedLandingPage {
  id: string;
  html: string;
  css: string;
  generatedAt: string;
  businessData: BusinessData;
  v0Url?: string;
  _isMock?: boolean;
  demo?: string;
}

interface LandingPagePreviewProps {
  page: GeneratedLandingPage;
  isLoading: boolean;
}

export function LandingPagePreview({
  page,
  isLoading,
}: LandingPagePreviewProps) {
  const [viewMode, setViewMode] = React.useState<"preview" | "code">("preview");

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generating your landing page...
            </h3>
            <p className="text-gray-600">
              This may take a few moments while we create your custom design.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center space-x-3">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("preview")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "preview"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setViewMode("code")}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === "code"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Code</span>
          </button>
        </div>

        <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ExternalLink className="w-4 h-4" />
          <span>Open in New Tab</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {viewMode === "preview" ? (
          <div className="relative">
            {/* Browser Chrome */}
            <div className="flex items-center space-x-2 px-4 py-3 bg-gray-100 border-b">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md px-3 py-1 text-sm text-gray-600">
                  {page.businessData.businessName
                    .toLowerCase()
                    .replace(/\s+/g, "")}
                  .com
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 min-h-[600px]">
              {/* Debug info - remove this later */}
              <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                <div>
                  <strong>Debug info:</strong>
                </div>
                <div>demo (iframe URL): {page.demo || "undefined"}</div>
                <div>v0Url (chat URL): {page.v0Url || "undefined"}</div>
                <div>_isMock: {page._isMock ? "true" : "false"}</div>
                <div>
                  Using:{" "}
                  {page.demo
                    ? "demo URL ✅"
                    : page.v0Url
                    ? "v0Url fallback ⚠️"
                    : "no URL ❌"}
                </div>
              </div>

              {page.demo || page.v0Url ? (
                <iframe
                  src={page.demo || page.v0Url}
                  className="w-full h-full min-h-[500px] border-0 rounded-lg"
                  title="Landing Page Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              ) : (
                <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center text-gray-500">
                    <div className="mb-2">No preview available</div>
                    <div className="text-sm">v0 iframe URL not found</div>
                    <div className="text-xs mt-2 text-red-500">
                      Expected: page.demo to contain iframe URL
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {/* HTML Section */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">HTML</h3>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-800">{page.html}</code>
              </pre>
            </div>

            {/* CSS Section */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">CSS</h3>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-800">{page.css}</code>
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Page Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        {page._isMock && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="text-yellow-800 text-sm font-medium">
              ⚠️ Using Mock Data
            </div>
            <div className="text-yellow-700 text-sm mt-1">
              Set V0_API_KEY environment variable to use the real v0 API.
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Generated:</span>
            <span className="text-gray-600 ml-2">
              {new Date(page.generatedAt).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Business:</span>
            <span className="text-gray-600 ml-2">
              {page.businessData.businessName}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Industry:</span>
            <span className="text-gray-600 ml-2">
              {page.businessData.industry}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Goal:</span>
            <span className="text-gray-600 ml-2">
              {page.businessData.mainGoal}
            </span>
          </div>
          {page.v0Url && (
            <div className="col-span-2">
              <span className="font-medium text-gray-700">v0 URL:</span>
              <a
                href={page.v0Url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 ml-2 text-sm break-all"
              >
                {page.v0Url}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
